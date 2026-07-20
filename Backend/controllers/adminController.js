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
exports.getRecentActivity = async(req,res)=>{
    try{
       const latestUser = await pool.query(
        `SELECT full_name
         FROM users
         ORDER BY id DESC
         LIMIT 1`
       );
       const latestJob = await pool.query(
        `SELECT title
         FROM jobs
         ORDER BY id DESC
         LIMIT 1`
       );
       const latestProposal = await pool.query(
        `SELECT proposal_text
         FROM proposals
         ORDER BY id DESC
         LIMIT 1`
       );
       res.json({
        success:true,activity:{
            latestUser:latestUser.rows.length > 0? latestUser.rows[0].full_name: "No Users",
            latestJob:latestJob.rows.length > 0? latestJob.rows[0].title: "No Jobs",
            latestProposal:latestProposal.rows.length > 0?latestProposal.rows[0].proposal_text:"No Proposals"
        }
       });
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Server Error"});
    }
};
exports.getPlatformInsights = async (req, res) => {
    try {
        const mostActiveUser = await pool.query(`
            SELECT full_name
            FROM users
            ORDER BY id DESC
            LIMIT 1
        `);
        const mostAppliedJob = await pool.query(`
            SELECT
                jobs.title,
                COUNT(proposals.id) AS applications
            FROM jobs
            LEFT JOIN proposals
            ON jobs.id = proposals.job_id
            GROUP BY jobs.id
            ORDER BY applications DESC
            LIMIT 1
        `);
        const highestBudgetJob = await pool.query(`
            SELECT title,budget
            FROM jobs
            ORDER BY budget DESC
            LIMIT 1
        `);
        const recentActivity = await pool.query(`
            SELECT COUNT(*) AS proposals_today
            FROM proposals
            WHERE DATE(created_at)=CURRENT_DATE
        `);
        res.json({
            success:true,
            insights:{
                mostActiveUser:mostActiveUser.rows[0] || null,
                mostAppliedJob:mostAppliedJob.rows[0] || null,
                highestBudgetJob:highestBudgetJob.rows[0] || null,
                recentActivity:recentActivity.rows[0] || null
            }
        });
    } catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Server Error"
        });
    }
};
exports.getUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        // Get basic user information
        const user = await pool.query(
            `
            SELECT id, full_name, email, role, phone, profile_image, created_at
            FROM users
            WHERE id = $1
            `,
            [id]
        );
        if (user.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        // Get profile information
        const profile = await pool.query(
            `
            SELECT *
            FROM profiles
            WHERE user_id = $1
            `,
            [id]
        );
        res.json({
            success: true,
            user: user.rows[0],
            profile: profile.rows[0] || null
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};