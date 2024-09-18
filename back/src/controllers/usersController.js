const Users = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/utils");
const emailService = require("../services/emailServices");

const registerUser = async (req, res) => {
    try{
        const { email, username, password } = req.body;

        const userExist = await Users.findOne({ username: username });
        if (userExist) return res.status(500).json({ status: "failed", message: "El usuario ya existe", error: error.message });

        if (password.length < 8 || password.length > 14){
            return res.status(500).json({ status: "failed", message: "La contraseña debe tener entre 8 y 14 carácteres", error: error.message });
        }

        const user = new Users({
            email: email,
            username: username,
            password: await bcrypt.hash(password, 10),
        });

        await user.save();
        const subject = `Gracias por registrarte, ${username}`;
        const html = `<h1>Bienvenido al Back de Politamente, ${username}</h1>`;
        await emailService.sendEmail(email, subject, html);

        res.status(200).json({ status: "succeded", error: null, data: user });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ status: "Failed", message: "El email ya existe", error: error.message });
        } else {
            res.status(400).json({ status: "failed", data: null, error: error.message });
        }
    }
};

const loginUser = async (req, res) => {
    try{
        const { username, password } = req.body;

        const user = await Users.findOne({ username: username });
        if (user) {
            const pwd = await bcrypt.compare(password, user.password);
            if (pwd) {
                const payload = { userId: user._id, email: user.email, username: user.username };
                const token = generateToken(payload, false);
                const token_refresh = generateToken(payload, true);

                return res.status(200).json({ status: "succeded", data: user, token: token, token_refresh: token_refresh });

            } else {
                return res.status(401).json({ status: "error", message: "The email and password didn't match..." });
            }
        } else {
            return res.status(401).json({ status: "error", message: "The email and password didn't match..." });
        }
    } catch (error) {
        res.status(400).json({ status: "error", message: "Error doing the login...", error: error.message });
    }
};

module.exports = { registerUser, loginUser };