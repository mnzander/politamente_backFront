const furnituresDB = require("../mocks/furnituresDB");
const Muebles = require("../models/furnituresModel");
const fs = require("node:fs");
const path = require('path');
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

const saveImage = async (file, type) => {
    if (!type) {
        throw new Error('No se ha proporcionado el tipo de mueble');
    }

    let newPath, originalname;

    if (typeof file === 'object' && file.path) {
        // Si file es un objeto con path, usamos ese path
        const filePath = file.path;
        originalname = path.basename(filePath);
        newPath = `/${type}/${originalname}`;
    } else {
        // Si file es un objeto con originalname y path
        if (!file || !file.originalname || !file.path) {
            throw new Error('No se ha proporcionado una imagen válida');
        }
        originalname = file.originalname;
        newPath = `/${type}/${originalname}`;
    }

    const newDir = path.join(__dirname, '..', '..', 'src', 'img', type);

    // Movemos el archivo a la nueva ubicación
    await fs.promises.rename(
        typeof file === 'object' && file.path ? file.path : file.originalname,
        path.join(newDir, originalname)
    );

    console.log("Ruta de la imagen:", newPath);
    console.log("Nombre del archivo:", originalname);
    return { path: newPath, filename: originalname };
};

const createFurniture = async (req, res) => {
    try{
        const newData = req.body;
        const imageFile = req.file;

        if (!newData.name || !newData.type || !newData.price) {
            return res.status(400).json({ status: "error", data: null, error: "Todos los campos son obligatorios" });
        }

        if (!newData.comment) {
            newData.comment =  "Sin comentarios"
        }

        if (!imageFile) {
            return res.status(400).json({ status: "error", data: null, error: "No se ha proporcionado una imagen" });
        }

        const imagePath = await saveImage(imageFile, newData.type);
        console.log("Ha llegado la ruta:", imagePath.path);
        console.log("Ha llegado el nombre:", imagePath.filename);

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
        try{
            await emailService.sendEmailWithAttachment(admin.email, subject, html, imagePath);
            console.log("Correo enviado con exito");
        } catch(error){
            console.error("Error al enviar el correo", error);
        }

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

        if (!id) {
            return res.status(400).json({ status: "error", data: null, error: "ID requerido" });
        }

        const furniture = await Muebles.findById(id);

        if (!furniture) {
            return res.status(404).json({ status: "error", data: null, error: "Mueble no encontrado" });
        }

        console.log("req.file:", req.file);
        console.log("req.body:", req.body);

        let imagePath;
        let hasImageChanged = false;

        // Si se proporcionó un nuevo archivo
        if (req.file && req.file.path && req.file.path !== furniture.img) {
            console.log("Cambiamos la imagen");

            // Eliminar la imagen anterior
            const imageDirectory = path.join(__dirname, '..', 'img');
            const oldImagePath = path.join(imageDirectory, furniture.img);

            try {
                await fs.promises.unlink(oldImagePath);
                console.log(`Imagen anterior eliminada correctamente: ${oldImagePath}`);
            } catch (error) {
                console.error(`Error al eliminar la imagen anterior: ${error.message}`);
            }
                    
            imagePath = await saveImage(req.file, req.body.type || furniture.type);
            hasImageChanged = true;
        } else {
            console.log("Procesamos la imagen existente");
            // Pasamos la ruta actual de la imagen como si fuera un nuevo archivo
            const currentImagePath = path.join(__dirname, '..', '..', 'src', 'img', furniture.type, path.basename(furniture.img));
            imagePath = await saveImage({ path: currentImagePath }, req.body.type || furniture.type);
        }

        console.log("imagePath:", imagePath);
        console.log("hasImageChanged:", hasImageChanged);

        const newData = {
            name: req.body.name || furniture.name,
            type: req.body.type || furniture.type,
            measures: req.body.measures || furniture.measures,
            comment: req.body.comment || furniture.comment,
            price: req.body.price || furniture.price,
            img: imagePath.path
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
                <li>Imagen: Si se cambia la imagen, deberia aparecer adjuntada.</li>
            </ul>
        `;

        try{
            if (hasImageChanged) {
                console.log("Envio el correo con foto");
                await emailService.sendEmailWithAttachment(admin.email, subject, html, imagePath);
            } else {
                console.log("Envio el correo sin foto");
                await emailService.sendEmail(admin.email, subject, html)
            }
            console.log("Correo enviado correctamente");
        } catch(error){
            console.error('Error al enviar correo:', error);
        }

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

        // Buscar y eliminar la imagen asociada al mueble
        const imageDirectory = path.join(__dirname, '..', 'img');
        const imagePath = path.join(imageDirectory, result.img);

        try {
            await fs.promises.unlink(imagePath);
            console.log(`Imagen eliminada correctamente: ${imagePath}`);
        } catch (error) {
            console.error(`Error al eliminar la imagen: ${error.message}`);
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