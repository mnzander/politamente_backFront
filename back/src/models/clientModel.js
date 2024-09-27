const { default: mongoose } = require("mongoose");

const clientSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    }
}, { timestamps: true });

const Clientes = mongoose.model("Clientes", clientSchema, "clientes");
module.exports = Clientes;