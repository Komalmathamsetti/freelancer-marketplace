const express = require("express");
const verifyToken = require("../middleware/authMiddleware.js");
const { recommendFeatures,generateBio } = require("../controllers/aiController.js");
const router = express.Router();
router.get("/recommend/:jobId", verifyToken,recommendFeatures);
router.post("/generate-bio",verifyToken,generateBio);
module.exports = router;