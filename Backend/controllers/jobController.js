const pool = require("../config/db");
exports.createJob = async(req,res)=>{
    try{
        const client_id = req.user.id;
        const {title,description,category,budget,experience_level,deadline,location} = req.body;
        const job = await pool.query("INSERT INTO jobs (client_id,title,description,category,budget,experience_level,deadline,location) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",[client_id,title,description,category,budget,experience_level,deadline,location]);
        res.status(201).json({success:true,message:"Job posted successfully",job:job.rows[0]});
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Server Error"});
    }
};
exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await pool.query(
            `SELECT jobs.*, users.full_name
             FROM jobs
             JOIN users
             ON jobs.client_id = users.id
             ORDER BY created_at DESC`
        );
        res.json({success:true,jobs:jobs.rows});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Server Error"});
    }
};
exports.getSingleJob = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await pool.query(
            `SELECT jobs.*, users.full_name
             FROM jobs
             JOIN users
             ON jobs.client_id = users.id
             WHERE jobs.id = $1`,
            [id]
        );
        if(job.rows.length===0){
            return res.status(404).json({success:false,message:"Job Not Found"});
        }
        res.json({success:true,job:job.rows[0]});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Server Error"});
    }
};
exports.getMyJobs = async (req, res) => {
    try {
        const clientId = req.user.id;
        const jobs = await pool.query(
            `
            SELECT *
            FROM jobs
            WHERE client_id = $1
            ORDER BY created_at DESC
            `,
            [clientId]
        );
        res.json({
            success: true,
            jobs: jobs.rows
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};