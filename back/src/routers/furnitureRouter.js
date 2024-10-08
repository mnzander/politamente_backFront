const { loadData, createFurniture, getFurnitures, getFurnituresById, updateFurnitureById, deleteFurnitureById, saveImage, getFurnituresByType, getNewestFurnitures, getCheapestFurnitures, getCostlierFurnitures, getFurnitureFinder, getFurnituresForAdmins,  } = require("../controllers/furnitureController");

const { authMiddleware } = require("../middleware/auth");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = require("express").Router();

// router.get("/loadData", loadData);
router.post("/", upload.single("img"), authMiddleware, createFurniture);
router.get("/", getFurnitures);
router.get("/admin", authMiddleware, getFurnituresForAdmins);
router.get("/novedades", getNewestFurnitures);
router.get("/precioAsc", getCheapestFurnitures);
router.get("/precioDesc", getCostlierFurnitures);
router.get("/find/:name", getFurnitureFinder);
router.get("/:type", getFurnituresByType);
router.get("/:id", getFurnituresById);
router.put("/:id", upload.single("img"), authMiddleware, updateFurnitureById);
router.delete("/:id", authMiddleware, deleteFurnitureById);

module.exports = router;