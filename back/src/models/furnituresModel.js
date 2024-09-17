const { default: mongoose } = require("mongoose");

const mueblesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["arcos", "bandejas", "bases", "carros", "cilindros", "cubos", "escaleras", "letras/numeros", "mesas", "paneles", "varios"],
        required: true,
    },
    measures: {
        type: String,
    },
    comment: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
        default: null,
    }
}, { timestamps: true });

const Muebles = mongoose.model("Muebles", mueblesSchema, "muebles");
module.exports = Muebles;