import { newsletterClient } from "../api/fetch.js";

document.addEventListener('DOMContentLoaded', function() {
    const newsletterBtn = document.querySelector(".newsletter-btn");
    const newsletterField = document.querySelector(".email"); // Cambia esto según tu estructura HTML
    
    newsletterBtn.addEventListener('click', async (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del botón
        const email = newsletterField.value;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.error("Correo electrónico inválido");
            throw new Error("Correo electrónico inválido");
        } else {
            await newsletterClient(email);
            window.location.reload();
            alert("Te has suscrito a la newsletter, revisa tu correo.");
        }
    });
});