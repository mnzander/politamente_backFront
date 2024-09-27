const nodemailer = require("nodemailer");
const fs = require("node:fs");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "admpolitamente@gmail.com",
        pass: "wvsl gtjg aswb iotq",
    },
});

const sendEmail = async (to, subject, html) => {
    try{
        const mailOptions = {
            from: "admpolitamente@gmail.com",
            to: to,
            subject: subject,
            html: html,
        };

        await transporter.sendMail(mailOptions, (err, info) => { 
            if (err) {
            console.log ("Error al enviar el correo", err.message); 
            } 
            else {
                console.log("Se ha enviado correctamente", info.response);
            };
        });

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