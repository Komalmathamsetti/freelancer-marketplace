const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { clientDashboard,freelancerDashboard,adminDashboard } = require("../controllers/dashboardController");
router.get("/client",authMiddleware,roleMiddleware("client"),clientDashboard);
router.get("/freelancer",authMiddleware,roleMiddleware("freelancer"),freelancerDashboard);
router.get("/admin",authMiddleware,roleMiddleware("admin"),adminDashboard);
module.exports = router;