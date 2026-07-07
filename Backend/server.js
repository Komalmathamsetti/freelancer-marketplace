const express = require('express');
const cors = require('cors');
require("dotenv").config();
const db = require("../Backend/config/db");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const dashBoardRoutes = require("./routes/dashboardRoutes");
const profileRoutes = require("./routes/profileRoutes");
const jobRoutes = require("./routes/jobRoutes");
const proposalRoutes = require("./routes/proposalRoutes");
const homeRoutes = require("./routes/homeRoutes");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/dashboard",dashBoardRoutes);
app.use("/api/profile",profileRoutes);
app.use("/api/jobs",jobRoutes);
app.use("/api/home",homeRoutes);
app.use("/api/proposals",proposalRoutes);
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({success: true, user: req.user,});
});
app.get("/",(req,res)=>{
    res.json({success:true,message:"Freelance marketplace API is running"});
});
const PORT = process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`Server is ruuning on port ${PORT}`);
});