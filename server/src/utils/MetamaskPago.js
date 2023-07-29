const { User, Payment, Product, Subscription } = require("../db")
const nodemailer = require("nodemailer");
require("dotenv").config();

const OUR_EMAIL = process.env.OUR_EMAIL;
const OUR_PASSWORD = process.env.OUR_PASSWORD;


const FeedbackMetamask = async (req, res) => {
  try{
  const { email, payment_id } = req.query;
  const { compra } = req.body; 

  compra.forEach((item) => {
    item.price = Number(item.price);
    item.quantity = Number(item.quantity); 
  });

  const totalAmount = compra.reduce((total, product) => total + product.price * product.quantity, 0);

  console.log("FeedbackMetamask");
  console.log(email);
  console.log(payment_id);
  console.log('llegue aca');
  console.log(compra);
  const date = new Date()
  const formatedDate = date.toISOString().split('T')[0];
  
  console.log('llegue aca 1');
  const newPayment = await Payment.create({
    id: payment_id,
    date: formatedDate,
    status: "approved",
    totalPrice: totalAmount
  })

  const user = await User.findOne({
    where: {email: email}
  })
  
  console.log('llegue aca 2');
  for (let i = 0 ; i < compra.length ; i++) {
    if (compra[i].name) {
    const product = await Product.findByPk(compra[i].id)
    const quantity = compra[i].quantity
    console.log(quantity);
    
    await newPayment.addProduct(product, {
      through: {
        quantity: quantity,
      },
    });
    product.stock = product.stock - quantity
    console.log('llegue aca 3');
    
    await product.save()
  }else{
    console.log('entre suscription else')
    const subscription = await Subscription.findOne({where: {price: compra[i].price}})
    console.log(subscription)
    await subscription.addPayment(newPayment)
    if (newPayment.status === "approved") {
      const months = subscription.type === "trimestral" ? 3 : subscription.type === "semestral" ? 6 : 12
      date.setMonth(date.getMonth() + months);
      const newExpirationDate = date.toISOString().split('T')[0];
      console.log(newExpirationDate)
      user.expirationDate = newExpirationDate
  
      await user.save() 
    
    }
    }
  }
  
  
  await user.addPayment(newPayment)
  console.log('llegue aca 4');
  
  
  const listadeproductos = compra?.map(
    (product) => `<li> Producto: ${product.name} - Precio: ${product.price} - Cantidad: ${product.quantity} </li>`
    );
    
    
    
    const stringListOfProducts = listadeproductos?.join("\n");
    const listOfProducts = stringListOfProducts
    ? "Lista de productos comprados: \n" + stringListOfProducts
    : "No hay productos en el carrito";
    
    console.log('llegue aca 5');
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
    to: `${email}`,
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
          <h3>Método de pago : Metamask</h3>
          <p>tu id de transacción: ${payment_id}</p>
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

}catch(error){}
};

module.exports = {
  FeedbackMetamask,
};
