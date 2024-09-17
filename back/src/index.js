const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = 9000;

const app = express();
app.use(express.json());
app.use(cors());

require("dotenv").config();

const furnitureRouter = require("./routers/furnitureRouter");

// Connect to MongoDB
console.log("Connecting to MongoDB with URL:", process.env.DATABASE_URL_DEV);
mongoose.connect(process.env.DATABASE_URL_DEV);
const db = mongoose.connection;

db.on("error", (error) => {
    console.log(`Error connecting with MongoDB ${error}`);
});

db.on("connected", () => {
    console.log("Connected to MongoDB");
});

db.on("disconnected", () => {
    console.log("MongoDB is disconnected");
});

app.use("/muebles", furnitureRouter);

app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`);
});