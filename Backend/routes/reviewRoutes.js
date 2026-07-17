const express = require("express");
const router = express.Router();
const { getHomeTestimonials } = require("../controllers/reviewController");
router.get("/home-testimonials",getHomeTestimonials);
module.exports = router;