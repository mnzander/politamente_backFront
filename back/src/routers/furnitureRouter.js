const { loadData, createFurniture, getFurnitures, getFurnituresById, updateFurnitureById, deleteFurnitureById, saveImage } = require("../controllers/furnitureController");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });
const router = require("express").Router();

// router.get("/loadData", loadData);
router.post("/", upload.single("img"), createFurniture);
router.get("/", getFurnitures);
router.get("/:id", getFurnituresById);
router.put("/:id", upload.single("img"), updateFurnitureById);
router.delete("/:id", deleteFurnitureById);

module.exports = router;