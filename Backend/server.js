const express = require('express');
const cors = require('cors');
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const db = require("../Backend/config/db");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const dashBoardRoutes = require("./routes/dashboardRoutes");
const profileRoutes = require("./routes/profileRoutes");
const jobRoutes = require("./routes/jobRoutes");
const proposalRoutes = require("./routes/proposalRoutes");
const homeRoutes = require("./routes/homeRoutes");
const adminRoutes = require("./routes/adminRoutes");
const freelancerRoutes = require("./routes/freelancerRoutes");
const messageRoutes = require("./routes/messageRoutes");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/freelancer",freelancerRoutes);
app.use("/api/dashboard",dashBoardRoutes);
app.use("/api/profile",profileRoutes);
app.use("/api/jobs",jobRoutes);
app.use("/api/home",homeRoutes);
app.use("/api/proposals",proposalRoutes);
app.use("/api/messages",messageRoutes);
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({success: true, user: req.user,});
});
app.get("/",(req,res)=>{
    res.json({success:true,message:"Freelance marketplace API is running"});
});
app.set("io",io);
const onlineUsers = new Set();
io.on("connection", (socket) => {
    socket.on("join",(userId)=>{
        socket.userId = userId;
        socket.join(userId.toString());
        onlineUsers.add(userId);
        io.emit("online-users",[...onlineUsers]);
        console.log(`User ${userId} is online`);
    });
    socket.on("disconnect",()=>{
        if(socket.userId){
            onlineUsers.delete(socket.userId);
            io.emit("online-users",[...onlineUsers]);
            console.log(`User ${socket.userId} went Offline`);
        }
    });
    socket.on("typing", (data) => {
    if (!data?.receiverId) return;
    io.to(data.receiverId.toString()).emit(
        "user-typing",
        data.senderId
    );
    });
    socket.on("stop-typing", (data) => {
    if (!data?.receiverId) return;
    io.to(data.receiverId.toString()).emit(
        "user-stop-typing",
        data.senderId
    );
    });
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});