const { default: mongoose } = require("mongoose");

const usersSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Correo incorrecto"],
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const Users = mongoose.model("Users", usersSchema, "users");
module.exports = Users;