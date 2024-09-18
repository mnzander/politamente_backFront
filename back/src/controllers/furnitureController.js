const furnituresDB = require("../mocks/furnituresDB");
const Muebles = require("../models/furnituresModel");
const fs = require("node:fs");
const Users = require("../models/usersModel");
const emailService = require("../services/emailServices");

const loadData = async (req, res) => {
    try{
        furnituresDB.map((furniture) => {
            const newFurniture = Muebles ({
                name: furniture.name,
                type: furniture.type,
                measures: furniture.measures,
                comment: furniture.comment,
                price: furniture.price,
                img: furniture.img,
            });
            newFurniture.save();
        });
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ status:"error", data: null, error: error.message });
    }
}

const saveImage = (file) => {
    const newPath = `./uploads/${file.originalname}`;
    fs.renameSync(file.path, newPath);
    return { path: newPath, filename: file.originalname };
}

const createFurniture = async (req, res) => {
    try{
        const newData = req.body;
        const imageFile = req.file;

        if (!newData.name || !newData.type || !newData.price) {
            return res.status(400).json({ status: "error", data: null, error: "Todos los campos son obligatorios" });
        }

        const imagePath = saveImage(imageFile);

        const newFurniture = await Muebles({
            name: newData.name,
            type: newData.type,
            measures: newData.measures,
            comment: newData.comment,
            price: newData.price,
            img: { path: imagePath.path, filename: imagePath.filename }
        });

        await newFurniture.save();

        const admin = await Users.findOne({ username: "adminpolitamente" });
        const subject = `¡Has subido un nuevo mueble, ${admin.username}!`;
        const html = `
            <h1> Mueble ${newFurniture.name} creado correctamente</h1>
            <br />
            <h2> Aqui tienes los detalles del mueble: </h2>
            <br />
            <ul>
                <li>Tipo: ${newFurniture.type}</li>
                <li>Medidas: ${newFurniture.measures}</li>
                <li>Commentario: ${newFurniture.comment}</li>
                <li>Precio: ${newFurniture.price}</li>
                <li>Imagen: ¡Revisa los archivos adjuntos!</li>
            </ul>
        `;
        await emailService.sendEmailWithAttachment(admin.email, subject, html, imagePath);
        res.status(201).json({ status: "created", data: newFurniture, error: null });
    } catch(error) {
        res.status(500).json({ status: "error", data: null, error: error.message });
    }
};

const getFurnitures = async (req, res) => {
    try{
        const allFurnitures = await Muebles.find();
        res.status(200).json({ status:"succeded", data: allFurnitures, error: null });
    } catch (error) {
        res.status(500).json({ status: "error", data: null, error: error.message });
    }
};

const getFurnituresById = async (req, res) => {
    try{
        const id = req.params.id;
        if(!id) {
            res.status(404).json({ status:"error", data: null, error: "No existe el mueble" }); 
        } 
        const furniture = await Muebles.findById(id)

        res.status(200).json({ status:"succeded", data: furniture, error: null });
    } catch (error) {
        res.status(500).json({ status: "error", data: null, error: error.message });
    }
};

const updateFurnitureById = async (req, res) => {
    try {
        const id = req.params.id;
        const imageFile = req.file;

        if (!id) {
            return res.status(400).json({ status: "error", data: null, error: "ID requerido" });
        }

        const furniture = await Muebles.findById(id);

        if (!furniture) {
            return res.status(404).json({ status: "error", data: null, error: "Mueble no encontrado" });
        }

        const imagePath = saveImage(imageFile);

        const newData = {
            name: req.body.name || furniture.name,
            type: req.body.type || furniture.type,
            measures: req.body.measures || furniture.measures,
            comment: req.body.comment || furniture.comment,
            price: req.body.price || furniture.price,
            img: imagePath.path || furniture.img
        };

        const updatedFurniture = await Muebles.findByIdAndUpdate(id, newData, { new: true });

        if (!updatedFurniture) {
            return res.status(404).json({ status: "error", data: null, error: "Error al actualizar el mueble" });
        }

        const admin = await Users.findOne({ username: "adminpolitamente" });
        const subject = `¡Has actualizado un mueble, ${admin.username}!`;
        const html = `
            <h1> Mueble ${updatedFurniture.name} actualizado correctamente</h1>
            <br />
            <h2> Aqui tienes los detalles actualizados del mueble: </h2>
            <br />
            <ul>
                <li>Tipo: ${updatedFurniture.type}</li>
                <li>Medidas: ${updatedFurniture.measures}</li>
                <li>Commentario: ${updatedFurniture.comment}</li>
                <li>Precio: ${updatedFurniture.price}</li>
                <li>Imagen: ¡Revisa los archivos adjuntos!</li>
            </ul>
        `;
        await emailService.sendEmailWithAttachment(admin.email, subject, html, imagePath);

        res.status(200).json({ status: "success", data: updatedFurniture, error: null });
    } catch (error) {
        console.error('Error al actualizar el mueble:', error);
        res.status(500).json({ status: "error", data: null, error: "Error interno del servidor" });
    }
};

const deleteFurnitureById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ status: "error", data: null, error: "ID requerido" });
        }

        const result = await Muebles.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ status: "error", data: null, error: "Mueble no encontrado" });
        }

        const admin = await Users.findOne({ username: "adminpolitamente" });
        const subject = `¡Has eliminado un mueble, ${admin.username}!`;
        const html = `<h1> Mueble ${result.name} eliminado correctamente</h1>`;
        await emailService.sendEmail(admin.email, subject, html);

        res.status(200).json({ status: "succeded", data: null, error: null });

    } catch(error) {
        res.status(500).json({ status: "error", data: null, error: error.message });
    }
};

module.exports = { loadData, saveImage, createFurniture, getFurnitures, getFurnituresById, updateFurnitureById, deleteFurnitureById };