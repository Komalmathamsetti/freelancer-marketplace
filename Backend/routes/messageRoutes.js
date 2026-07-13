const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const { sendMessage,getConversations,getMessages } = require("../controllers/messageController");
router.post("/send",verifyToken,sendMessage);
router.get("/conversations",verifyToken,getConversations);
router.get("/:userId",verifyToken,getMessages);
module.exports = router;