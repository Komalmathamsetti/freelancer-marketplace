const pool = require("../config/db");
exports.getFeaturedJobs = async(req,res)=>{
    try{
        const jobs = await pool.query(
            `SELECT
            jobs.*,
            users.full_name
            FROM jobs
            JOIN users
            ON jobs.client_id = users.id
            WHERE jobs.status='Open'
            ORDER BY jobs.created_at DESC
            LIMIT 6`
        );
        res.json({success:true,jobs:jobs.rows});
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Server Error"});
    }
};
exports.getCategories = async(req,res)=>{
    try{
        const categories = await pool.query(
            `SELECT
            category,
            COUNT(*) AS total_jobs
            FROM jobs
            WHERE status='Open'
            GROUP BY category
            ORDER BY total_jobs DESC`
        );
        res.json({success:true,categories:categories.rows});
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Server Error"});
    }
};
exports.getFeaturedFreelancers = async(req,res)=>{
    try{
        const freelancers = await pool.query(
            ` SELECT
            id,
            full_name,
            email
            FROM users
            WHERE role='freelancer'
            ORDER BY id DESC
            LIMIT 6`
        );
        res.json({success:true,freelancers:freelancers.rows});
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Server Error"});
    }
};