const express = require("express");
const router = express.Router();
const verifyToken = require("..//middleware/authMiddleware");
const { createJob, getAllJobs, getSingleJob } = require("../controllers/jobController");
router.post("/", verifyToken, createJob);
router.get("/", getAllJobs);
router.get("/:id", getSingleJob);
module.exports = router;