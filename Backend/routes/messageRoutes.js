const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const { sendMessage,getConversations,getMessages,deleteMessage } = require("../controllers/messageController");
router.post("/send",verifyToken,sendMessage);
router.get("/conversations",verifyToken,getConversations);
router.get("/:userId",verifyToken,getMessages);
router.delete("/:id",verifyToken,deleteMessage);
module.exports = router;