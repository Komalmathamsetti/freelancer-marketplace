const pool = require("../config/db");
const { createNotification } = require("../services/notificationsService");
exports.createJob = async(req,res)=>{
    try{
        const client_id = req.user.id;
        const {title,description,category,budget,experience_level,deadline,location} = req.body;
        const job = await pool.query("INSERT INTO jobs (client_id,title,description,category,budget,experience_level,deadline,location) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",[client_id,title,description,category,budget,experience_level,deadline,location]);
        const io = req.app.get("io");
        const freelancers = await pool.query(
            `SELECT id FROM users WHERE role = 'freelancer'`
        );
        for(const freelancer of freelancers.rows){
            await createNotification({
               io,
               userId: freelancer.id,
               title:"New Job Posted",
               message:`A new job "${job.rows[0].title}" has been posted.`,
               type:"JOB",
            
            });
        }
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
            SELECT
                jobs.*,
                COUNT(proposals.id) AS proposal_count
            FROM jobs
            LEFT JOIN proposals
            ON jobs.id = proposals.job_id
            WHERE jobs.client_id = $1
            GROUP BY jobs.id
            ORDER BY jobs.created_at DESC
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
exports.updateJob = async(req,res)=>{
    try{
        const { id } = req.params;
        const {
            title,
            description,
            category,
            budget,
            experience_level,
            deadline,
            location
        } = req.body;
        let job;
        if (req.user.role === "admin") {
            job = await pool.query(
                `SELECT * FROM jobs WHERE id = $1`,[id]
            );
        } else {
            job = await pool.query(
                `SELECT * FROM jobs
                WHERE id = $1
                AND client_id = $2`,[id, req.user.id]
            );
        }
        if(job.rows.length === 0){
            return res.status(404).json({success:false,message:"Job not found"});
        }
        const updatedJob = await pool.query(
            `UPDATE jobs
            SET title = $1,
            description= $2,
            category = $3,
            budget= $4,
            experience_level = $5,
            deadline = $6,
            location = $7
            WHERE id = $8
            RETURNING *`,[title,description,category,budget,experience_level,deadline,location,id]
        );
        const io = req.app.get("io");
        // Find all freelancers who applied
        const applicants = await pool.query(
            `SELECT DISTINCT freelancer_id
            FROM proposals 
            WHERE job_id = $1`,[id]
        );
        // Notify each applicant
        for (const applicant of applicants.rows) {
            await createNotification({
            io,
            userId: applicant.freelancer_id,
            title: "Job Updated",
            message: `The job "${updatedJob.rows[0].title}" has been updated.`,
            type: "JOB_UPDATE",
            relatedId: id,
        });
    }
        res.json({success:true,message:"Job updated successfully",job:updatedJob.rows[0]});
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Server Error"});
    }
};
exports.deleteJob = async (req,res)=>{
    try{
        const clientId=req.user.id;
        const {id}=req.params;
        const job=await pool.query(
            `SELECT *
            FROM jobs
            WHERE id=$1
            AND client_id=$2
            `,[id,clientId]
        );
        if(job.rows.length===0){
            return res.status(404).json({success:false,message:"Job Not Found"});
        }
        await pool.query(
            `DELETE FROM jobs
            WHERE id=$1
            `,[id]
        );
        res.json({success:true,message:"Job Deleted Successfully"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Server Error"});
    }

};
exports.getDashboardStats = async (req, res) => {
    try {
        const clientId = req.user.id;
        const openJobs = await pool.query(
            `SELECT COUNT(*) FROM jobs
             WHERE client_id=$1
             AND status='Open'`,
            [clientId]
        );
        const closedJobs = await pool.query(
            `SELECT COUNT(*) FROM jobs
             WHERE client_id=$1
             AND status='Closed'`,
            [clientId]
        );
        const proposals = await pool.query(
            `SELECT COUNT(*)
             FROM proposals
             JOIN jobs
             ON proposals.job_id=jobs.id
             WHERE jobs.client_id=$1`,
            [clientId]
        );
        const accepted = await pool.query(
            `SELECT COUNT(*)
             FROM proposals
             JOIN jobs
             ON proposals.job_id=jobs.id
             WHERE jobs.client_id=$1
             AND proposals.status='Accepted'`,
            [clientId]
        );
        res.json({
            success: true,
            stats: {
                openJobs: Number(openJobs.rows[0].count),
                closedJobs: Number(closedJobs.rows[0].count),
                proposals: Number(proposals.rows[0].count),
                accepted: Number(accepted.rows[0].count)
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
exports.getClientJob = async (req, res) => {
    try {

        const clientId = req.user.id;
        const { id } = req.params;
        // Get Job Details
        const jobResult = await pool.query(
            `
            SELECT
                jobs.*,
                users.full_name
            FROM jobs
            JOIN users
            ON jobs.client_id = users.id
            WHERE jobs.id = $1
            AND jobs.client_id = $2
            `,
            [id, clientId]
        );
        if (jobResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }
        // Get Proposal Statistics
        const stats = await pool.query(
            `
            SELECT
                COUNT(*) AS total,
                COUNT(*) FILTER (WHERE status='Pending') AS pending,
                COUNT(*) FILTER (WHERE status='Accepted') AS accepted,
                COUNT(*) FILTER (WHERE status='Rejected') AS rejected
            FROM proposals
            WHERE job_id = $1
            `,
            [id]
        );
        const job = jobResult.rows[0];
        job.totalApplicants = Number(stats.rows[0].total);
        job.pendingApplicants = Number(stats.rows[0].pending);
        job.acceptedApplicants = Number(stats.rows[0].accepted);
        job.rejectedApplicants = Number(stats.rows[0].rejected);
        res.json({
            success: true,
            job
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
exports.closeJob = async (req, res) => {
    try {
        const clientId = req.user.id;
        const { id } = req.params;
        const job = await pool.query(
            `
            SELECT *
            FROM jobs
            WHERE id=$1
            AND client_id=$2
            `,
            [id, clientId]
        );
        if (job.rows.length === 0) {
            return res.status(404).json({
                success:false,
                message:"Job not found"
            });
        }
        await pool.query(
            `
            UPDATE jobs
            SET status='Closed'
            WHERE id=$1
            `,
            [id]
        );
        res.json({
            success:true,
            message:"Job Closed Successfully"
        });
    } catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Server Error"
        });
    }
};