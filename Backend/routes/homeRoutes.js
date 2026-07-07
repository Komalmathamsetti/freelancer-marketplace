const express = require("express");
const router = express.Router();
const { getFeaturedJobs,getCategories,getFeaturedFreelancers } = require("../controllers/homeController");
router.get("/featured-jobs",getFeaturedJobs);
router.get("/categories",getCategories);
router.get("/featured-freelancers",getFeaturedFreelancers);
module.exports = router;