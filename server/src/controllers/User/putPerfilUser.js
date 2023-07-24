const { User } = require("../../db");
const nodemailer = require("nodemailer");

const putPerfilUser = async (req, res) => {
    const { name, picture, nickName, email, expirationDate } = req.body;

    try {

        // console.log()
        if (!email)
            return res.status(400).json({ message: "Debe mandar un email" });
        if ((!name && !picture && !nickName && !email))
            return res
                .status(400)
                .json({ message: "Debe ingresar datos al cambiar" });

        const profile = await User.findOne({
            where: {
                email,
            },
        });
        if (!profile)
            return res
                .status(404)
                .json({ message: "No existe un usuario con ese email" });

        for (let prop in req.body) {
            if (req.body[prop]) profile[prop] = req.body[prop];
        }

        await profile.save();
        const response = {
            profile,
            message: `Nuevo Nombre de Usuario: ${profile.name} fue agregado  con éxito`,
        };
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
            subject: "Notificacion de ProgrammersGurú (Edicion de Perfil)",
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
                    <h1 style="text-align: center;">Saludos Programador</h1>
                    <p>¡Tu perfil de usuario ha sido modificado exitosamente! Espero que disfrutes de tu estadía aquí.</p>
                    <p>Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos.</p>
                    <p>¡Que tengas un excelente día!</p>
                    <h2> Atentamente ProgrammersGurú Team</h2>
                </body>
                </html>`,
        };

        transtorpe.sendMail(destino, (error, info) => {
            if (error) {
                res.status(500).send(error.message);
            } else {
                console.log("se ha enviado");
               
                return res.status(200).json(response);
            }
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { putPerfilUser };
