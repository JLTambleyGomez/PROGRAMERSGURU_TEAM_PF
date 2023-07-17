const mercadoPago = require("mercadopago");
//const { Payment } = require("../db"); 
require("dotenv").config();

mercadoPago.configure({
  access_token: "APP_USR-8277578497653004-071418-c51188f2051d9d2476ace948ca7cbda1-1423373513",
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
      failure: "http://localhost:5173/MercadoPagoFailure",
      pending: "http://localhost:5173/MercadoPagoPending",
    },
    auto_return: "approved",
  };
  console.log(preference);

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

    console.log(result);
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
