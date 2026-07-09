const pool = require("../config/db");
exports.getDashboardStats = async(req,res)=>{
    try{
       const freelancerId = req.user.id;
       const applications = await pool.query(
        `SELECT COUNT(*)
        FROM proposals
        WHERE freelancer_id = $1`,[freelancerId]
       );
       const saved_jobs = await pool.query(
        `SELECT COUNT(*)
        FROM saved_jobs
        WHERE freelancer_id = $1`,[freelancerId]
       );
       const recommendedJobs = await pool.query(
        `SELECT COUNT(*)
        FROM jobs
        WHERE status = 'Open'`
       );
       res.json({
        success:true,
        stats:{
           totalApplications:applications.rows[0].count,
           savedJobs:saved_jobs.rows[0].count,
           recommendedJobs:recommendedJobs.rows[0].count
        }
       });
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Server Error"});
    }
};
exports.saveJob = async(req,res)=>{
    try{
        const freelancerId = req.user.id;
        const {jobId} = req.params;
        const alreadySaved = await pool.query(
            `SELECT *
            FROM saved_jobs
            WHERE freelancer_id = $1
            AND job_id = $2`,[freelancerId,jobId]
        );
        if(alreadySaved.rows.length > 0){
            return res.status(400).json({success:false,message:"Job already Saved"});
        }
        await pool.query(
            `INSERT INTO saved_jobs
            (freelancer_id,job_id)
            VALUES ($1,$2)`,[freelancerId,jobId]
        );
        res.json({success:true,message:"Job saved successsfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Server Error"});
    }
};
exports.removeJob = async(req,res)=>{
    try{
        const freelancerId = req.user.id;
        const {jobId} = req.params;
        await pool.query(
            `DELETE FROM 
            saved_jobs
            WHERE freelancer_id = $1
            AND job_id = $2`,[freelancerId,jobId]
        );
        res.json({success:true,message:"Jod removed"});
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Server Error"});
    }
};
exports.getSavedJobs=async(req,res)=>{
    try{
        const freelancerId=req.user.id;
        const jobs=await pool.query(
            `
            SELECT
            jobs.*,
            users.full_name
            FROM saved_jobs
            JOIN jobs
            ON saved_jobs.job_id=jobs.id
            JOIN users
            ON jobs.client_id=users.id
            WHERE saved_jobs.freelancer_id=$1
            ORDER BY saved_jobs.created_at DESC`,[freelancerId]
        );
        res.json({success:true,jobs:jobs.rows});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Server Error"});
    }
};
exports.getRecommendedJobs=async(req,res)=>{
    try{
        const jobs=await pool.query(
            `
            SELECT
            jobs.*,
            users.full_name
            FROM jobs
            JOIN users
            ON jobs.client_id=users.id
            WHERE jobs.status='Open'
            ORDER BY jobs.created_at DESC
            LIMIT 5`
        );
        res.json({success:true,jobs:jobs.rows});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Server Error"});
    }
};