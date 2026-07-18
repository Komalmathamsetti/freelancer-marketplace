const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getProfile, updateProfile,getFreelancerProfile } = require("../controllers/profileController");
router.get("/",authMiddleware,getProfile);
router.put("/",authMiddleware,updateProfile);
router.get("/freelancer/:id",authMiddleware,getFreelancerProfile);
module.exports = router;