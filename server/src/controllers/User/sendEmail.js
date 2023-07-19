const nodemailer = require("nodemailer");
require("dotenv").config();
const OUR_EMAIL = process.env.OUR_EMAIL;
const OUR_PASSWORD = process.env.OUR_PASSWORD;

const SendEmail= (req, res) =>{

    const {email,message}= req.body;
   console.log(email)
    let transporte = nodemailer.createTransport({//crea un "transporte", se usa para indicar quien lo envia
        host:"smtp.gmail.com",
        port:465,
        secure:true, //debe ser true sí el port es 465
        auth:{
            user: `caldesanche@gmail.com`,
            pass: `uwnehfrwtlqehqlo` //contraseña de app
        }
    })

    const destino={//la info y el destinatario
        from:"Pogrammers Guru",
        to: "caldesanche@gmail.com",
        subject: "mensaje",
        text:"Visite nuestra pagina en URL"
    }


    transporte.sendMail(destino, (error, info)=>{

        if(error){
            res.status(500).send({message:"esta fallando"});
        } else{
            res.status(200).json({message:"enviado"});
      }});
}

module.exports = { SendEmail }; 