const pool = require("../config/db");
exports.getDashboardStats = async(req,res)=>{
   try{
       const users = await pool.query(
        `SELECT COUNT(*) FROM users`
       );
       const clients = await pool.query(
        `SELECT COUNT(*) FROM users WHERE role='client'`
       );
       const freelancers = await pool.query(
        `SELECT COUNT(*) FROM users WHERE role='freelancer'`
       );
       const jobs =await pool.query(
        `SELECT COUNT(*) FROM jobs`
       );
       const proposals = await pool.query(
        `SELECT COUNT(*) FROM proposals`
       );
       res.json({
        success:true,
        stats:{
            totalUsers:users.rows[0].count,
            totalClients: clients.rows[0].count,
            totalFreelancers: freelancers.rows[0].count,
            totalJobs: jobs.rows[0].count,
            totalProposals: proposals.rows[0].count
        }
       });
   }catch(error){
    console.log(error);
    res.status(500).json({success:false,message:"Server Error"});
   }
};
exports.getAllUsers = async(req,res)=>{
   try{
       const users = await pool.query(
        `SELECT 
        id,
        full_name,
        email,
        role,
        created_at
        FROM users 
        ORDER BY created_at DESC`
       );
       res.json({
        success:true,
        users:users.rows
       });
   }catch(error){
    console.log(error);
    res.status(500).json({success:false,message:"Server Error"});
   }
};
exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await pool.query(
            `SELECT
            jobs.*,
            users.full_name
            FROM jobs
            JOIN users
            ON jobs.client_id = users.id
            ORDER BY jobs.created_at DESC`
        );
        res.json({success: true,jobs: jobs.rows});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({success: false,message: "Server Error"});
    }
};
exports.deleteUser = async(req,res)=>{
    try{
        const {id}=req.params;
        const user=await pool.query(
            `SELECT *
            FROM users
            WHERE id=$1`,[id]

        );
        if(user.rows.length===0){
            return res.status(404).json({success:false,message:"User Not Found"});
        }
        await pool.query(
            `DELETE FROM users
            WHERE id=$1`,[id]
        );
        res.json({success:true,message:"User Deleted Successfully"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Server Error"});
    }
};
exports.deleteJob = async(req,res)=>{
    try{
        const {id} = req.params;
        const job = await pool.query(
            `SELECT *
            FROM jobs
            WHERE id = $1`,[id]
        );
        if(job.rows.length === 0){
            res.json({success:false,message:"Job not found"});
        }
        await pool.query(
            `DELETE FROM jobs
            WHERE id = $1`,[id]
        );
        res.json({success:true,message:"Job deleted successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Server Error"});
    }
};
exports.getAllProposals = async(req,res)=>{
    try{
        const proposals = await pool.query(
            `SELECT
                proposals.*,
                jobs.title AS job_title,
                users.full_name AS freelancer_name
            FROM proposals
            JOIN jobs
                ON proposals.job_id = jobs.id
            JOIN users
                ON proposals.freelancer_id = users.id
            ORDER BY proposals.created_at DESC`
        );
        res.json({success:true,proposals:proposals.rows});
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Server Error"});
    }
};
exports.deleteProposal = async(req,res)=>{
    try{
        const { id } = req.params;
        await pool.query(
            `DELETE FROM proposals WHERE id = $1`,[id]
        );
        res.json({success:true,message:"Proposal Deleted Successfully"});
    }catch(error){
       console.log(error);
       res.status(500).json({success:false,message:"Server Error"});
    }
};
exports.getPlatformAnalytics = async (req, res) => {
    try {
        const totalUsers = await pool.query(
            `SELECT COUNT(*) FROM users`
        );
        const totalClients = await pool.query(
            `SELECT COUNT(*) FROM users WHERE role='client'`
        );
        const totalFreelancers = await pool.query(
            `SELECT COUNT(*) FROM users WHERE role='freelancer'`
        );
        const totalJobs = await pool.query(
            `SELECT COUNT(*) FROM jobs`
        );
        const totalProposals = await pool.query(
            `SELECT COUNT(*) FROM proposals`
        );
        const accepted = await pool.query(
            `SELECT COUNT(*) FROM proposals WHERE status='Accepted'`
        );
        const pending = await pool.query(
            `SELECT COUNT(*) FROM proposals WHERE status='Pending'`
        );
        const rejected = await pool.query(
            `SELECT COUNT(*) FROM proposals WHERE status='Rejected'`
        );
        res.json({
            success:true,
            analytics:{
                totalUsers:Number(totalUsers.rows[0].count),
                totalClients:Number(totalClients.rows[0].count),
                totalFreelancers:Number(totalFreelancers.rows[0].count),
                totalJobs:Number(totalJobs.rows[0].count),
                totalProposals:Number(totalProposals.rows[0].count),
                accepted:Number(accepted.rows[0].count),
                pending:Number(pending.rows[0].count),
                rejected:Number(rejected.rows[0].count)
            }
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Server Error"});
    }
};