const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getNotifications,markAsRead,markAllAsRead,deleteNotification } = require("../controllers/notificationController");
router.get("/",authMiddleware,getNotifications);
router.patch("/:id/read",authMiddleware,markAsRead);
router.patch("/read-all",authMiddleware,markAllAsRead);
router.delete("/:id",authMiddleware,deleteNotification);
module.exports = router;