const { User } = require("../../db");
const nodemailer = require("nodemailer");

const signUp = async (req, res) => {
    console.log("controler signup");
    const defaultPicture =
        "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-24.jpg";
    try {
        const { email, name, picture } = req.body;
        console.log("este es el signup");
        if (!email && !name)
            return res
                .status(404)
                .json({ message: "Debe ingresar los datos a modificar" });

        const [newUser, created] = await User.findOrCreate({
            where: {
                email: email,
            },
            defaults: {
                picture: !picture ? defaultPicture : picture,
                name: !name ? email : name,
                nickName: !name ? email : name,
            },
        });
        if (!created) {
            return res.json({
                message: "El usuario ya está en la base de datos",
            });
        }
        console.log(newUser);

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
            subject: "Notificacion de ProgrammersGurú (Registro)",
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
                    <h1 style="text-align: center;">Bienvenido Programador</h1>
                    <p>¡Gracias por registrarte en  nuestro sitio web! Espero que disfrutes de tu estadía aquí.</p>
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
                return res
                    .status(201)
                    .json({ message: "El usuario fue creado correctamente" });
            }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { signUp };
