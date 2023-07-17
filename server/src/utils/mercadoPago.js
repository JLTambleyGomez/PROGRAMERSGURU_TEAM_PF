const mercadoPago = require("mercadopago");
//const { Payment } = require("../db"); 
require("dotenv").config();

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
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
};

module.exports = {
  PagoconMercadopago, FeedbackMercadoPago
};
