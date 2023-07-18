const mercadopago = require("mercadopago");
//const { Payment } = require("../db"); 
const nodemailer = require('nodemailer');
require("dotenv").config();

//configuración
mercadopago.configure({
  access_token: "TEST-5203705310014851-071717-15efe019b789ede02a3cedf3a6ede73a-1426577714",
});
// creación orden de pago 
const PagoconMercadopago = async (req, res) => {
  const result = await mercadopago.preferences.create({
    items: [
      {
        title: req.body.description,
        unit_price: Number(req.body.price),
        currency_id: req.body.currency_id,
        quantity: Number(req.body.quantity)
      }
    ],
    back_urls: {
      success: "http://localhost:5173/feedbackmp",
      failure: "http://localhost:5173/feedbackmp" 
    },
    notification_url: "https://5a6e-181-85-95-85.ngrok.io/feedbackmp"
  })
  
  res.send(result.body);
};

// webhook
const receiveWebhook = async (req, res) => {
  const payment = req.query;
  try {
    if(payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"])
      console.log(data);
    } return res.status(201).json({Payment: req.query.payment_id, Status: req.query.status, MerchantOrder: req.query.merchant_order_id})
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// const receiveWebhook = async (req, res) => {
//   const payment = req.query;
//   try {
//     if (payment.type === 'payment') {
//       const data = await mercadopago.payment.findById(payment['data.id']);
//       console.log(data);

//       // Obtén el correo electrónico del pagador
//       const email = data.body.payer.email;
//       console.log('Correo electrónico:', email);

//       // Envía el correo electrónico de confirmación al pagador
//       const transporter = nodemailer.createTransport({
//         service: 'Gmail',
//         auth: {
//           user: 'programersguru_team@gmail.com',
//           pass: '123456789A#',
//         },
//       });

//       const mailOptions = {
//         from: 'programersguru_team@gmail.com',
//         to: "solbenevent6@gmail.com", // Correo electrónico del pagador obtenido anteriormente
//         subject: 'Confirmación de compra',
//         text: '¡Gracias por tu compra! Detalles de la compra: ...', // Aquí puedes agregar los detalles de la compra
//       };

//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.error(error);
//         } else {
//           console.log('Correo electrónico enviado:', info.response);
//         }
//       });

//       // Devuelve la respuesta al webhook
//       return res.status(201).json({ Payment: req.query.payment_id, Status: req.query.status, MerchantOrder: req.query.merchant_order_id });
//     }
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

//feedback 
const FeedbackMercadoPago = async (req, res) => {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
};

module.exports = {
  PagoconMercadopago, receiveWebhook, FeedbackMercadoPago
};
