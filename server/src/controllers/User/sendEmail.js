const nodemailer = require("nodemailer");
require("dotenv").config();
const OUR_EMAIL = process.env.OUR_EMAIL;
const OUR_PASSWORD = process.env.OUR_PASSWORD;

const SendEmail= (req, res) =>{
    const {email,message}= req.body;

  let transtorpe = nodemailer.createTransport({//crea un "transporte", se usa para indicar quien lo envia
        host:"smtp.gmail.com",
        port:465,
        secure:true, //debe ser true sí el port es 465
        auth:{
            user: `${OUR_EMAIL}`,
            pass: `${OUR_PASSWORD}` //contraseña de app
        }
    })

    const destino={//la info y el destinatario
        from:"Pogrammers Guru",
        to: "caldesanche@gmail.com",
        subject:`${message}`,
        text:`Visite nuestra pagina en URL`
    }

    transtorpe.sendMail(destino, (error, info)=>{
        if(error){
            res.status(500).json({ message: "Algo salió mal"});
        }else{
            res.status(200);
      }});
}

module.exports = { SendEmail }; 