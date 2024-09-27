const Clientes = require("../models/clientModel");
const emailService = require("../services/emailServices");


const newsletterClient = async (req, res) => {
    try{
        const email = req.params.email;

        const newClient = await Clientes.create({
            email: email
        });

        const to = newClient.email;
        const subject = `¡Bienvenido a Politamente!`;
        const html = `
            <h1>Gracias por suscribirte a la Newsletter de Politamente ${newClient.email}</h1>
            <p>Recibiras todas nuestras novedades, descuentos y ofertas</p>
            <p>Muchas gracias y un saludo desde el equipo Politamente</p>
        `;
        await emailService.sendEmail(to, subject, html);
        res.status(200).json({ status: "success", data: newClient, error: null,})
    } catch(error){
        console.error('Error al suscribirse a la Newsletter:', error);
        res.status(500).json({ status: "error", data: email, error: "Error interno del servidor" });
    }
};

module.exports = { newsletterClient };