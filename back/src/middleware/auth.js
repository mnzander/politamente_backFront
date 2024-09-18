const jwt = require("jsonwebtoken");
const Users = require("../models/usersModel");

const authMiddleware = async (req, res, next) => {
    const token = req.header("auth"); //Declaramos el token y que el header tendra el nombre AUTH
    if (!token) return res.status(401).send("Access Denied"); //Si no hay token denegamos acceso

    try{
        const payload = jwt.verify(token, process.env.TOKEN_SECRET); //Verificamos el token usando JWT
        req.user = await Users.findById(payload.userId); //Guardar la informacion del payload
        if (!req.user) return res.status(404).send("User not found..."); //Si no se encontro el usuario devuelve error
        next(); //Sigue adelante

    } catch (error){
        try{
            const payload = jwt.verify(token, process.env.TOKEN_REFRESH_SECRET); //Verificamos el token_refresh usando JWT
            req.user = await Users.findById(payload.userId); //Guardar la informacion del payload
            if (!req.user) return res.status(404).send("User not found..."); //Si no se encontro el usuario devuelve error
            next(); //Sigue adelante
        } catch (error){
            console.error('Error verifying token:', error);
            res.status(401).json({ message: 'Invalid token' });
        }
    }
};

module.exports = { authMiddleware };