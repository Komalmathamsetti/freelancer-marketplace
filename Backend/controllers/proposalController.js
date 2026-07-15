const pool = require("../config/db");
exports.applyJob = async(req,res)=>{
    try{
        const freelancerId = req.user.id;
        const { jobId } = req.params;
        const {
            proposal_text,
            bid_amount,
            estimated_days
        } = req.body;
        const job = await pool.query(
        `SELECT status
         FROM jobs
         WHERE id = $1`,
        [jobId]
        );
        if (job.rows.length === 0) {
          return res.status(404).json({
            success: false,
            message: "Job not found"
        });
        }
        if (job.rows[0].status === "Closed") {
          return res.status(400).json({
            success: false,
            message: "This job is already closed."
        });
        }
        const alreadyApplied = await pool.query(
            `SELECT * FROM proposals
            WHERE job_id = $1
            AND freelancer_id = $2`,[jobId,freelancerId]
        );
        if(alreadyApplied.rows.length > 0){
            return res.status(400).json({
                success:false,
                message:"You have already applied"
            });
        }
        const proposal = await pool.query(
            `INSERT INTO proposals
            (job_id,freelancer_id,proposal_text,bid_amount,estimated_days)
            VALUES ($1,$2,$3,$4,$5)
            RETURNING *`,[jobId,freelancerId,proposal_text,bid_amount,estimated_days]
        );
        res.status(201).json({
            success:true,
            message:"Application Submitted",
            proposal: proposal.rows[0]
        });
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Server Error"});
    }
}
exports.getMyApplications = async (req, res) => {
    try {
        const freelancerId = req.user.id;
        const proposals = await pool.query(
            `SELECT
                proposals.*,
                jobs.title,
                jobs.category,
                jobs.location,
                jobs.budget,
                jobs.client_id
            FROM proposals
            JOIN jobs
            ON proposals.job_id = jobs.id
            WHERE proposals.freelancer_id = $1
            ORDER BY proposals.created_at DESC`,
            [freelancerId]
        );
        res.json({
            success: true,
            proposals: proposals.rows
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
exports.viewApplicants = async (req, res) => {
    try {
        const { jobId } = req.params;
        const applicants = await pool.query(
            `SELECT
            proposals.*,
            users.id AS freelancer_id,
            users.full_name,
            users.email
            FROM proposals
            JOIN users
            ON proposals.freelancer_id=users.id
            WHERE job_id=$1
            ORDER BY created_at DESC`,
            [jobId]
        );
        res.json({
            success: true,
            applicants: applicants.rows
        });
    }catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
exports.acceptProposal = async (req, res) => {
   try {
        const { id } = req.params;
        // Find proposal
        const proposalResult = await pool.query(
            `SELECT * FROM proposals WHERE id = $1`,
            [id]
        );
        if (proposalResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Proposal not found"
            });
        }
        const proposal = proposalResult.rows[0];
        // Accept selected proposal
        await pool.query(
            `UPDATE proposals
             SET status = 'Accepted'
             WHERE id = $1`,
            [id]
        );
        // Reject all other proposals for same job
        await pool.query(
            `UPDATE proposals
             SET status = 'Rejected'
             WHERE job_id = $1
             AND id <> $2`,
            [proposal.job_id, id]
        );
        // Close the job
        await pool.query(
            `UPDATE jobs
             SET status = 'Closed'
             WHERE id = $1`,
            [proposal.job_id]
        );
        res.json({
            success: true,
            message: "Proposal Accepted Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
exports.rejectProposal = async (req, res) => {
    try {
        const { id } = req.params;
        const proposal = await pool.query(
            `UPDATE proposals
             SET status='Rejected'
             WHERE id=$1
             RETURNING *`,
            [id]
        );
        if (proposal.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Proposal not found"
            });
        }
        res.json({
            success: true,
            message: "Proposal Rejected Successfully",
            proposal: proposal.rows[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
exports.withdrawApplication = async (req,res)=>{
    try{
        const freelancerId=req.user.id;
        const {proposalId}=req.params;
        const proposal=await pool.query(
            `SELECT *
            FROM proposals
            WHERE id=$1
            AND freelancer_id=$2`,[proposalId,freelancerId]
        );
        if(proposal.rows.length===0){
            return res.status(404).json({success:false,message:"Application Not Found"});
        }
        await pool.query(
            `
            DELETE FROM proposals
            WHERE id=$1`,[proposalId]
        );
        res.json({success:true,message:"Application Withdrawn Successfully"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Server Error"});
    }
};
exports.checkApplication = async (req, res) => {
    try {

        const freelancerId = req.user.id;
        const { jobId } = req.params;
        const proposal = await pool.query(
            `SELECT status
             FROM proposals
             WHERE freelancer_id = $1
             AND job_id = $2`,
            [freelancerId, jobId]
        );
        if (proposal.rows.length > 0) {
            return res.json({
                success: true,
                applied: true,
                status: proposal.rows[0].status
            });
        }
        res.json({
            success: true,
            applied: false
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
exports.getClientProposals = async (req, res) => {
    try {
        const clientId = req.user.id;
        const proposals = await pool.query(
            `SELECT
                proposals.*,
                jobs.title,
                jobs.category,
                jobs.location,
                jobs.budget,
                users.full_name,
                users.email
            FROM proposals
            JOIN jobs
                ON proposals.job_id = jobs.id
            JOIN users
                ON proposals.freelancer_id = users.id
            WHERE jobs.client_id = $1
            ORDER BY proposals.created_at DESC
            `,
            [clientId]
        );
        res.json({success: true,proposals: proposals.rows});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false,message: "Server Error"});
    }
};