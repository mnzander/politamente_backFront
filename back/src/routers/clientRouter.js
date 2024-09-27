const { newsletterClient } = require("../controllers/clientController");

const router = require("express").Router();

router.post("/newsletter/:email", newsletterClient);

module.exports = router;