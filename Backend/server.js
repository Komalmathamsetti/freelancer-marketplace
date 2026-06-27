const express = require('express');
const cors = require('cors');
require("dotenv").config();
const db = require("../Backend/config/db");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
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