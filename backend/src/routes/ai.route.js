const express = require("express");
const router = express.Router();
const aiController = require("../controllers/ai.controller");

router.post("/generateDetails", aiController.createWordDetails);

module.exports = router;