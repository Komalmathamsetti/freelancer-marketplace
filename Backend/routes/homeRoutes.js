const express = require("express");
const router = express.Router();
const { getFeaturedJobs,getCategories,getFeaturedFreelancers,getHomeStats } = require("../controllers/homeController");
router.get("/featured-jobs",getFeaturedJobs);
router.get("/categories",getCategories);
router.get("/featured-freelancers",getFeaturedFreelancers);
router.get("/stats",getHomeStats);
module.exports = router;