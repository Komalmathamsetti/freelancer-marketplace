const express = require("express");
const verifyToken = require("../middleware/authMiddleware.js");
const { recommendFeatures } = require("../controllers/aiController.js");
const router = express.Router();
router.get("/recommend/:jobId", verifyToken,recommendFeatures);
module.exports = router;