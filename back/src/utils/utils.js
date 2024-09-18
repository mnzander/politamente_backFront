const jwt = require("jsonwebtoken"); //Traeemos JWT

const generateToken = (payload, isRefresh) => { //Generamos el token con el payload y el booleano isRefresh
    if (isRefresh) { //Si el booleano que le pasamos en la llamada es true
        return jwt.sign(payload, process.env.TOKEN_REFRESH_SECRET, { expiresIn: "120min" }); //Generamos el token refresh que expira en 2h
    }

    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "60min" }) //Si es false, creamos el TOKEN que expira en 1h
};

module.exports = { generateToken }; //Exportamos la funcion generateToken