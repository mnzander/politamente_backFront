const nodemailer = require("nodemailer");
const fs = require("node:fs");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "ander.munoz.rivas@zabalburu.org",
        pass: "ogrm mrjh oumq qqjr",
    },
});

const sendEmail = async (to, subject, html) => {
    try{
        const mailOptions = {
            from: "ander.munoz.rivas@zabalburu.org",
            to: to,
            subject: subject,
            html: html,
        };
        await transporter.sendMail(mailOptions);
        console.log("Se ha enviado correctamente");
    } catch (error) {
        console.log("No se ha enviado el correo", error);
    }
};

const sendEmailWithAttachment = async (to, subject, html, attachmentPath) => {
    const attachment = {
        filename: attachmentPath.filename, // Usa el nombre del archivo desde el objeto
        content: fs.readFileSync(attachmentPath.path), // Usa el path del archivo desde el objeto
        contentType: 'image/png' // Ajusta este tipo según el formato de tu imagen
    };
    
    await transporter.sendMail({
        from: "ander.munoz.rivas@zabalburu.org",
        to: to,
        subject: subject,
        html: html,
        attachments: [attachment]
    });
    console.log("Se ha enviado correctamente");
};

module.exports = { sendEmail, sendEmailWithAttachment };