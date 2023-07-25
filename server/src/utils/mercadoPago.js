const { User, Payment, Product } = require("../db")
const mercadoPago = require("mercadopago");
const nodemailer = require("nodemailer");
require("dotenv").config();
const URL_FEEDBACKS = process.env.URL_FEEDBACKS
const OUR_EMAIL = process.env.OUR_EMAIL;
const OUR_PASSWORD = process.env.OUR_PASSWORD;

mercadoPago.configure({
  access_token: "TEST-6017613403493713-072110-6dcf755ef51edd4970b6ed14ed9133c3-1429901448",
});

const PagoconMercadopago = async (req, res) => {
  console.log(req.body);
  let preference = {
    items: [
      {
        title: req.body.description.slice(0,256),
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
      },
    ],
    back_urls: {
      success: "http://localhost:5173/MercadoPagoFeedback",
      failure: URL_FEEDBACKS,
      pending: URL_FEEDBACKS,
    },
    auto_return: "approved",
  };

  console.log(req.body)

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
try {
  const { email, merchant_order_id, payment_id } = req.query;
  const { compra } = req.body; 
  
  const totalAmount = compra.reduce((total, product) => total + product.price * product.quantity, 0);

  const date = new Date()
  const formatedDate = date.toISOString().split('T')[0];

  const newPayment = await Payment.create({
    id: payment_id,
    date: formatedDate,
    status: "fullfiled",
    totalPrice:totalAmount
  })

  for (let i = 0 ; i < compra.length ; i++) {
    const product = await Product.findByPk(compra[i].id)
    const quantity = compra[i].quantity

    await newPayment.addProduct(product, {
      through: {
        quantity: quantity,
      },
    });
    product.stock = product.stock - quantity
    await product.save()
  }


  const user = await User.findOne({
    where: {email: email}
  })

  await user.addPayment(newPayment)




  const listadeproductos = compra?.map(
    (product) => `<li> Producto: ${product.name} - Precio: ${product.price} - Cantidad: ${product.quantity} </li>`
  );

  const compraHTML = compra
    ? compra.map(
        (product) =>
          ` <li> Producto: ${product.name} - Precio: ${product.price} - Cantidad: ${product.quantity} </li>`
      )
    : "No hay productos en el carrito prueba HTML";

  const stringListOfProducts = listadeproductos?.join("\n");
  const listOfProducts = stringListOfProducts
    ? "Lista de productos comprados: \n" + stringListOfProducts
    : "No hay productos en el carrito";

  var transtorpe = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: `caldesanche@gmail.com`,
      pass: `uwnehfrwtlqehqlo`,
    },
  });

  const destino = {
    from: "yo",
    to: `${req.query.email}`,
    subject: "Notificacion de ProgrammersGurú (Compra)",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bienvenido a ProgrammersGurú</title>
          <style>
              /* Estilos del mensaje de bienvenida aquí */
              body {
                  margin: 0;
                  padding: 0;
                  background: linear-gradient(to bottom right, #0d326b, #001529);
                  color: white;
                  font-family: Arial, sans-serif;
              }
              h1 {
                  border-bottom: 2px solid white;
                  padding-bottom: 10px;
              }
              p {
                  margin: 10px 0;
              }
              /* Estilos adicionales según tus preferencias */
          </style>
      </head>
      <body>
          <h1 style="text-align: center;">Tu Compra está completa</h1>
          <p>¡Gracias por comprar en nuestro sitio web! Espero que disfrutes de tu selección.</p>
          <h2> Aqui tienes información de tu compra </h2>
          <h3>Método de pago : MercadoPago</h3>
          <p>tu id de compra: ${payment_id}</p>
          <hr/>
          <div>
          </div>
          <ul>${listOfProducts}</ul>
          <hr/>
          <p>Total: $${totalAmount}</p>
          <p>Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos directamente en nuestra página web! .</p>
          <p>¡Que tengas un excelente día!</p>
          <h2> Atentamente ProgrammersGurú Team</h2>
      </body>
      </html>
  `,
  };

  transtorpe.sendMail(destino, (error, info) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      console.log("se ha enviado");
    }
  });

  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
} catch (error) {
  
}
  
  
};

module.exports = {
  PagoconMercadopago,
  FeedbackMercadoPago,
};



