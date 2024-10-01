import { loginUser } from "../api/fetch.js";

document.addEventListener('DOMContentLoaded', function() {
    
    const loginBtn = document.getElementById("login-btn");
    loginBtn.addEventListener("click", async() => {
        try {
            const username = document.getElementById("user").value.trim();
            const password = document.getElementById("password").value.trim();
    
            if (!username || !password) return alert("Rellena todos los campos...");

            const userLog = await loginUser(JSON.stringify({
                username: username,
                password: password
            }));
    
            if (userLog.data === undefined) return alert("El username y la contraseña no coinciden...");
            
            
            localStorage.setItem("token", userLog.token);
            window.location.href = "dashboard.html";

        } catch(error) {
            alert("Error al intentar hacer login, intentalo de nuevo...");
        }
    });
});