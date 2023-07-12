const { response } = require('express');
const bcrypt = require ("bcryptjs");
const Usuario = require("../models/Usuario");
const { generateJWT } = require ("../middlewares/generateJWT")
const nodemailer = require("nodemailer");
const fs = require('fs');
require('dotenv').config();

const createUser = async(req, res = response) => {

    const {email, password, name} = req.body;

    try {

        let user = await Usuario.findOne({email});
    
        if(user) return res.status(400).send({ok:false, msg:'El usuario ya existe'})
    
        user = new Usuario(req.body)
        
        // encriptando password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync (password,salt);

        user.colorProfile = Math.floor(7 * Math.random())

        await user.save()

        const token = await generateJWT(user._id, user.name, user.role, user.publicationsCode, user.email, user.comments, user.colorProfile)
        sendEmail(email, password);
        res.status(201).send({token})

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const getUser = async (req, res = response) => {

    const { id } = req.params;

    try {

        let user = await Usuario.findOne({ _id: id});
        if(!user) return res.status(400).send({ ok: false, msg: 'El usuario no existe'})
        const token = await generateJWT (user.id, user.name, user.role, user.publicationsCode, user.email, user.comments, user.colorProfile)
        res.status(200).send({token})

    } catch (error) {
        res.send(error)
    }
}

const loginUser = async (req, res = response) => {

    const {email, password} = req.body;

    try {

        let user = await Usuario.findOne({email});
        if(!user) return res.status(400).send({ ok: false, msg: 'El usuario no existe'})
        const token = await generateJWT (user.id, user.name, user.role, user.publicationsCode, user.email, user.comments, user.colorProfile)
        const validarPassword = bcrypt.compareSync(password, user.password)
        
        !validarPassword ? res.status(400).send({msg: 'Correo o contraseña incorrectos'}) : res.status(200).send({token}) //user

    } catch (error) {
        res.send(error)
    }
}

const revalidarToken = async (req, res = response) => {
    const {uid, name, role, publicationsCode, email, colorProfile} = req
    const token = await generateJWT (uid, name, role, postalPublicationCode, email, colorProfile)
    res.send(token)
}

const getAllEmails = async (req, res = response) => {
    
    try {
        let users = (await Usuario.find()).filter(user => (
            user.email !== 'tallerlispector@gmail.com'
        ));
        let emails = users.map(user => (
            user.email
        ))
        res.status(200).send({emails})
    } catch (error) {
        res.send(error)
    }
}

const sendEmail = async (email, password) => {

    const user = await Usuario.findOne({email});
    if( !user ){
        throw new Error('No hay ninguna cuenta registrada con el correo suministrado')
    }

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: `${process.env.FROM_EMAIL_EMAIL}`, // generated ethereal user
          pass: `${process.env.FROM_EMAIL_PASSWORD}`, // generated ethereal password
        },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: 'tallerlispector@gmail.com', // sender address
        //TODO: Probar con múltiples destinatarios
        to: `${user.email}`, // list of receivers
        subject: "¡Bienvenid@ a Taller Lispector!", // Subject line
        html: `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <style>
                body {
                    font-family: 'Arial'
                }

                .navbar-email {
                    background-color: #9FD5D1;
                    border-radius: 5px;
                    padding: 1rem;
                    text-align: center;
                }
        
                .logo-taller-email{
                    width: 15rem;
                }
        
                .titulo-email {
                    color: #4D4D4D;
                    text-align: center;
                }
        
                .boton_inicio_sesion_email{
                    text-decoration: none;
                    background-color: #9FD5D1;
                    padding: .8rem .8rem;
                    border-radius: 10px;
                    color: white;
                    font-weight: bold;
                }
        
                .boton_inicio_sesion_email:hover {
                    background-color: #195ef1;
                    color: white;
                }
            </style>
            <title>¡Bienvenid@ a Taller Lispector!</title>
          </head>
          <body>
            <div class="navbar-email">
            <a href="https://www.tallerlispector.com/" target="_blank">
                <img class="logo-taller-email" src="cid:Logo_Lispector_Completo" alt="Logo App" />
            </a>
            </div>
            <br />
            <h1 class="titulo-email">¡Bienvenid@ a Taller Lispector! 👋🏽</h1>
            <p style="text-align: center; color: #4D4D4D; text-align: justify;">Acabas de registrar tu cuenta en nuestra página web. ¡Ahora puedes disfrutar de todas las funcionalidades que disponemos para ti! 📚</p>
            <br />
            <h3 style="color: #4D4D4D;">${user.name}, a continuación encontrarás las credenciales de tu cuenta. Recuerda tenerlas a la mano ya que no disponemos del servicio de recuperación de contraseña. Ten muy presente esta información, ¡por amor a Clarice! 👩🏼</h3>
            <br />
            <div style="text-align: center;">
                <h2 style="color: #9FD5D1;">Correo Electrónico 📬</h2>
                <h3 style="color: #4D4D4D;"><i>${email}</i></h3>
                <br />
                <h2 style="color: #9FD5D1;">Contraseña 🔒</h2>
                <h3 style="color: #4D4D4D;"><i>${password}</i></h3>
                <br />
                <br />
                <br />
                <a class="boton_inicio_sesion_email" href="https://www.tallerlispector.com/inicio_sesion" target="_blank">Iniciar Sesión</a>
                <br />
                <br />
                <br />
                <br />
                <p style="text-align: left; font-size: 0.8rem; color: #4D4D4D;">Cualquier duda, responde a este mail. Estamos aquí para ayudarte. 💙</p>
                <br />
                <p style="text-align: left; font-size: 0.8rem; color: #4D4D4D;">Un abrazo,</p>
                <p style="text-align: left; font-size: 0.8rem; color: #4D4D4D; font-weight: bold;">Colectivo Taller Lispector 📖</p>
                <br />
            </div>
            <br />
            <br />
            <footer class="footer">
                <h4 style="text-align: center; color: #4D4D4D;">&copy; 2022 Copyright: Taller Lispector.</h4>
            </footer>
          </body>
        </html>`, // html body
        attachments: [ //this is for find the img at send
            {
                filename: 'Logo_Lispector_Completo.png',
                path: __dirname + '/images/Logo_Lispector_Completo.png',
                cid: 'Logo_Lispector_Completo'
            }
        ]
    });
}


module.exports = {
    createUser,
    loginUser,
    revalidarToken,
    getUser,
    getAllEmails
}