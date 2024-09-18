const crypto = require("crypto");

const secret = "Token";

const hash = crypto.createHmac("sha256", secret).update("soy otro campo mas").digest("hex");

console.log(hash);