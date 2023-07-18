const mercadoPago = require("mercadopago");
//requiero nodemailer para enviar mensajes de gmail
const nodemailer= require("nodemailer")
//const { Payment } = require("../db"); 
require("dotenv").config();
const OUR_EMAIL = process.env.OUR_EMAIL;
const OUR_PASSWORD = process.env.OUR_PASSWORD;


mercadoPago.configure({
  access_token: "TEST-7366931760156988-071417-9f721ac6bad881e7546f0df180920193-1423375235",
});

const PagoconMercadopago = async (req, res) => {

  let preference = {
    items: [
      {
        title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
      },
    ],
    back_urls: {
      success: "http://localhost:5173/MercadoPagoFeedback",
      failure: "http://localhost:5173/HomePage",
      pending: "http://localhost:5173/HomePage",
    },
    auto_return: "approved",
  };

  const result = mercadoPago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id,
      });
    })
    
    .catch(function (error) {
      console.log(error);
    });
};



const FeedbackMercadoPago = async (req, res) => {

  const {email}= req.body;
  var transtorpe= nodemailer.createTransport({//crea un "transporte", se usa para indicar quien lo envia
        host:"smtp.gmail.com",
        port:465,
        secure:true, //debe ser true sí el port es 465
        auth:{
            user: `${OUR_EMAIL}`,
            pass: `${OUR_PASSWORD}` //contraseña de app
        }
    })

    const destino={//la info y el destinatario
        from:"yo",
        to: email,
        subject:"notificacion de Mercadopago",
        text:`Su numero de orden es: ${req.query.payment_id}`
    }

    transtorpe.sendMail(destino, (error, info)=>{
        if(error){
            res.status(500).send(error.message)
        }else{
            console.log("se ha enviado")
      }})
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
};

module.exports = {
  PagoconMercadopago, FeedbackMercadoPago
};
