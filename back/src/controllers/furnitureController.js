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
    if (!file || !file.path || !file.originalname) {
        throw new Error('No se ha proporcionado una imagen válida');
    }
    
    const newPath = `/uploads/${file.originalname}`; // Usamos originalname aquí
    fs.renameSync(file.path, `./uploads/${file.originalname}`);
    return { path: newPath, filename: file.originalname };
};

const createFurniture = async (req, res) => {
    try{
        const newData = req.body;
        const imageFile = req.file;

        if (!newData.name || !newData.type || !newData.price) {
            return res.status(400).json({ status: "error", data: null, error: "Todos los campos son obligatorios" });
        }

        if (!imageFile) {
            return res.status(400).json({ status: "error", data: null, error: "No se ha proporcionado una imagen" });
        }

        const imagePath = saveImage(imageFile);

        const newFurniture = await Muebles({
            name: newData.name,
            type: newData.type,
            measures: newData.measures,
            comment: newData.comment,
            price: newData.price,
            img: imagePath.path
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
        console.log(imagePath, imagePath.filename);
        await emailService.sendEmailWithAttachment(admin.email, subject, html, imagePath);
        res.status(201).json({ status: "created", data: newFurniture, error: null });
    } catch(error) {
        res.status(500).json({ status: "error", data: null, error: error.message });
    }
};

const getFurnitures = async (req, res) => {
    try{
        const { page = 1, limit = 12 } = req.query;

        const allFurnitures = await Muebles.find()
            .limit(limit) //Limita el nº de muebles a 12 por consulta
            .skip((page - 1) * limit) //Omite el numero de muebles que tiene la pagina anterior a la que estamos.
            .exec(); //Metodo de mongoose para ejecutar consultas

        const totalCount = await Muebles.countDocuments(); //Cuenta cuantos muebles ahi en la DB

        res.status(200).json({ 
            status:"succeded", 
            data: allFurnitures, 
            meta: { //Mandamos esta info al front
                total: totalCount, //Nº de muebles en la DB
                pages: Math.ceil(totalCount / limit), //Nº de paginas necesarias redondeando hacia arriba
                currentPage: page //Y el valor de la pagina en la que estamos
            }, 
            error: null
        });
    } catch (error) {
        res.status(500).json({ status: "error", data: null, error: error.message });
    }
};

const getFurnituresForAdmins = async (req, res) => {
    try{
        const { page = 1, limit = 12 } = req.query;

        const allFurnitures = await Muebles.find()
            .limit(limit) 
            .skip((page - 1) * limit)
            .exec();

        const totalCount = await Muebles.countDocuments();

        res.status(200).json({ 
            status:"succeded", 
            data: allFurnitures, 
            meta: {
                total: totalCount, 
                pages: Math.ceil(totalCount / limit), 
                currentPage: page 
            }, 
            error: null
        });
    } catch (error) {
        res.status(500).json({ status: "error", data: null, error: error.message });
    }
};

const getNewestFurnitures = async (req, res) => {
    try {
        const { page = 1, limit = 12 } = req.query;
        
        const newestFurnitures = await Muebles.find()
            .sort({ createdAt: -1 }) // Ordena por fecha de creación en orden descendente
            .limit(limit)
            .skip((page - 1) * limit)
            .exec();

        const totalCount = await Muebles.countDocuments();
        
        res.status(200).json({
            status: "succeded",
            data: newestFurnitures,
            meta: {
                total: totalCount,
                pages: Math.ceil(totalCount / limit),
                currentPage: page
            },
            error: null
        });
    } catch (error) {
        res.status(500).json({ status: "error", data: null, error: error.message });
    }
};

const getCheapestFurnitures = async(req, res) => {
    try{
        const { page = 1, limit = 12 } = req.query

        const cheapestFurnitures = await Muebles.find()
            .sort({ price: 1 })
            .limit(limit)
            .skip((page - 1) * limit)
            .exec();

            const totalCount = await Muebles.countDocuments();

            res.status(200).json({ 
                status:"succeded", 
                data: cheapestFurnitures, 
                meta: { //Mandamos esta info al front
                    total: totalCount, //Nº de muebles en la DB
                    pages: Math.ceil(totalCount / limit), //Nº de paginas necesarias redondeando hacia arriba
                    currentPage: page //Y el valor de la pagina en la que estamos
                }, 
                error: null
            });
    } catch(error){
        res.status(500).json({ status: "error", data: null, error: error.message });
    }
}

const getCostlierFurnitures = async(req, res) => {
    try{
        const { page = 1, limit = 12 } = req.query

        const cheapestFurnitures = await Muebles.find()
            .sort({ price: -1 })
            .limit(limit)
            .skip((page - 1) * limit)
            .exec();

            const totalCount = await Muebles.countDocuments();

            res.status(200).json({ 
                status:"succeded", 
                data: cheapestFurnitures, 
                meta: { //Mandamos esta info al front
                    total: totalCount, //Nº de muebles en la DB
                    pages: Math.ceil(totalCount / limit), //Nº de paginas necesarias redondeando hacia arriba
                    currentPage: page //Y el valor de la pagina en la que estamos
                }, 
                error: null
            });
    } catch(error){
        res.status(500).json({ status: "error", data: null, error: error.message });
    }
}

const getFurnitureFinder = async (req, res) => {
    try{
        const { page = 1, limit = 12 } = req.query;
        const { name } = req.params;

        const filteredFurnitures = await Muebles.find({ name: new RegExp(name, "i") }) //Busca por el valor name sin importarle las mayusculas
        .limit(limit) //Limita el nº de muebles a 12 por consulta
        .skip((page - 1) * limit) //Omite el numero de muebles que tiene la pagina anterior a la que estamos.
        .exec(); //Metodo de mongoose para ejecutar consultas

        const totalCount = await Muebles.countDocuments({ name: new RegExp(name, "i") }); //Cuenta cuantos muebles ahi en la DB

        res.status(200).json({
            status: "succeded",
            data: filteredFurnitures,
            meta: { //Mandamos esta info al front
                total: totalCount, //Nº de muebles en la DB
                pages: Math.ceil(totalCount / limit), //Nº de paginas necesarias redondeando hacia arriba
                currentPage: page //Y el valor de la pagina en la que estamos
            }, 
            error: null
          });
    } catch(error) {
        res.status(500).json({ status: "error", data: null, error: error.message });
    }
};

const getFurnituresByType = async(req, res) => {
    try{ 
        const type = req.params.type;
        if(!type) {
            res.status(404).json({ status:"error", data: null, error: "No existe el tipo de mueble" }); 
        }

        const { page = 1, limit = 12 } = req.query;

        const furnitures = await Muebles.find({ type: type })
            .limit(limit)
            .skip((page - 1) * limit)
            .exec();

            
        const totalCount = await Muebles.countDocuments({ type: type }); //Cuenta cuantos muebles ahi en la DB

        res.status(200).json({ 
            status:"succeded", 
            data: furnitures, 
            meta: {
                total: totalCount,
                pages: Math.ceil(totalCount / limit),
                currentPage: page
            },
            error: null 
        });
    } catch(error) {
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

module.exports = { loadData, saveImage, createFurniture, getFurnitures, getFurnituresForAdmins, getFurnitureFinder, getNewestFurnitures, getCheapestFurnitures, getCostlierFurnitures, getFurnituresByType, getFurnituresById, updateFurnitureById, deleteFurnitureById };