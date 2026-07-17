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
exports.getHomeStats = async (req, res) => {
    try {
        const freelancerResult = await pool.query(
            "SELECT COUNT(*) FROM users WHERE role='freelancer'"
        );
        const clientResult = await pool.query(
            "SELECT COUNT(*) FROM users WHERE role='client'"
        );
        const jobsResult = await pool.query(
            "SELECT COUNT(*) FROM jobs"
        );
        const completedProjects = await pool.query(
            "SELECT COUNT(*) FROM jobs WHERE status='completed'"
        );
        res.json({
            freelancers: Number(freelancerResult.rows[0].count),
            clients: Number(clientResult.rows[0].count),
            jobs: Number(jobsResult.rows[0].count),
            completedProjects: Number(completedProjects.rows[0].count)
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Unable to fetch statistics"
        });
    }
};