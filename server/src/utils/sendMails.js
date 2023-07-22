const nodemailer = require("nodemailer");


const mailSender = (email)=>{

    var transtorpe= nodemailer.createTransport({//crea un "transporte", se usa para indicar quien lo envia
        host:"smtp.gmail.com",
        port:465,
        secure:true, //debe ser true sí el port es 465
        auth:{
          user: `caldesanche@gmail.com`,
          pass: `uwnehfrwtlqehqlo` //contraseña de app
        }
      })
        
      
      const destino={//la info y el destinatario
        from:"yo",
        to: `${email}`,
        subject:`lo que sea`,
        text:"Visite nuestra pagina en URL"
      }
      
      transtorpe.sendMail(destino, (error, info)=>{
        if(error){
            res.status(500).send(error.message)
        }else{
            console.log("se ha enviado")
      }})
};

module.exports={mailSender}