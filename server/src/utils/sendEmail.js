const nodemailer = require("nodemailer");

const SendEmail = async (req, res) => {
  const { email, message } = req.query;

  console.log("Query:", req.query);
  console.log("Email:", email);
  console.log("Message:", message);

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "caldesanche@gmail.com",
        pass: "uwnehfrwtlqehqlo", // Contraseña de la aplicación
      },
    });

    const mailOptions = {
      from: "ProgrammersGurú-Staff",
      to: email,
      subject: "No Responder",
      html: message,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email enviado:", info.messageId);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error en el envío del correo:", error);
    res.status(500).send(error.message);
  }
};

module.exports = { SendEmail };


