const pool = require("../config/db");
const { queryAI } = require("../services/ai/groq");
exports.recommendFeatures = async(req,res)=>{
    try{
        const { jobId } = req.params;
        const jobResult = await pool.query(
            `SELECT * FROM jobs
            WHERE id = $1`,[jobId]
        );
        if(jobResult.rows.length === 0){
            return res.status(404).json({success:false,message:"Job Not Found",});
        }
        const job = jobResult.rows[0];
        const freelancerResult = await pool.query(
            `SELECT
            users.id,
            users.full_name,
            users.email,
            profiles.bio,
            profiles.skills,
            profiles.experience,
            profiles.hourly_rate,
            profiles.portfolio
            FROM users
            JOIN profiles
            ON users.id = profiles.user_id
            WHERE users.role='freelancer'`
        );
        if(freelancerResult.rows.length === 0){
            return res.status(404).json({
                success:false,
                message:"No freelancers Found",
            });
        }
        const freelancers = freelancerResult.rows;
        const prompt = `You are an expert AI recruiter.
        Compare the following freelancers with this job.
        JOB
        Title: ${job.title}
        Description:${job.description}
        Category:${job.category}
        Budget:${job.budget}
        Experience:${job.experience_level}
        ----------------------------------
        FREELANCERS
        ${freelancers.map((f) => `ID: ${f.id}
        Name: ${f.full_name}
        Skills:${f.skills}
        Experience:${f.experience}
        Bio:${f.bio}
        Hourly Rate:${f.hourly_rate}
        Portfolio:${f.portfolio}
        ------------------------`).join("\n")}
        Return ONLY valid JSON.
        Example:
        [{
        "id":1,
        "match":95,
        "reason":"Excellent React and Node.js skills."
        }]
        Do not return markdown.
        Do not return explanation.
        Only JSON.`;
        const aiResponse = await queryAI(prompt);
        let recommendations;
        try{
            recommendations=JSON.parse(aiResponse);
        }catch{
            return res.status(500).json({
                success: false,
                message: "AI returned invalid JSON",
                raw: aiResponse,
            });
        }
        const finalRecommendations = recommendations.map((rec) => {
        const freelancer = freelancers.find(
            (f) => Number(f.id) === Number(rec.id || rec.userId || rec.freelancer_id)
        );
        if (!freelancer) {
            return {
            id: rec.id,
            match: rec.match,
            reason: rec.reason,
           };
        }
        return {
        ...freelancer,
        match: rec.match,
        reason: rec.reason,
       };
    });
    res.json({
        success: true,
        job,
        recommendations: finalRecommendations,
    });
    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    }
};