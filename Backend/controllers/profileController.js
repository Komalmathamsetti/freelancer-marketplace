const pool = require("../config/db");
exports.getProfile = async(req,res)=>{
    try{
        const userId = req.user.id;
        const user = await pool.query(
            `SELECT full_name,email FROM users WHERE id = $1`,[userId]
        );
        const profile = await pool.query(
            `SELECT * FROM profiles
            WHERE user_id = $1`,[userId]
        );
        if(profile.rows.length === 0){
            return res.json({
                success: true,
                user: user.rows[0],
                profile: null
            });
        }
        res.json({success:true,user:user.rows[0],profile:profile.rows[0]});
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Server Error"});
    }
};
exports.updateProfile = async(req,res)=>{
    try{
        const userId = req.user.id;
        const { full_name,bio,skills,hourly_rate,experience,portfolio,company_name,company_description,website,contact_number } = req.body;
        await pool.query(
                `UPDATE users 
                SET full_name = $1
                WHERE id = $2`,[full_name,userId]
        );
        const parsedHourlyRate = hourly_rate === "" || hourly_rate == null ? null: Number(hourly_rate);
        const parsedExperience = experience === "" || experience == null ? null: experience.trim();
        const check = await pool.query(
            `SELECT * FROM profiles
            WHERE user_id = $1`,[userId]
        );
        if(check.rows.length === 0){
            const newProfile = await pool.query(
                `INSERT INTO profiles
                (user_id,bio,skills,hourly_rate,experience,portfolio,company_name,company_description,website,contact_number)
                VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
                RETURNING *`,[userId,bio,skills,parsedHourlyRate,parsedExperience,portfolio,company_name,company_description,website,contact_number]
            );
            return res.json({success:true,message:"Profile Created",profile:newProfile.rows[0]});
        }
        const updateProfile = await pool.query(
            `UPDATE profiles
            SET 
            bio = $1,skills=$2,hourly_rate=$3,experience=$4,portfolio=$5,company_name=$6,company_description=$7,website=$8,contact_number=$9
            WHERE user_id = $10
            RETURNING *`,
            [bio,skills,parsedHourlyRate,parsedExperience,portfolio,company_name,company_description,website,contact_number,userId]
        );
        res.json({success:true,message:"Profile updated successfully",profile:updateProfile.rows[0]});
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Server Error"});
    }
};
exports.getFreelancerProfile = async(req,res)=>{
    try{
        const { id } = req.params;
        const user = await pool.query(
            `SELECT id,full_name,email
            FROM users WHERE id = $1 AND role = 'freelancer'`,[id]
        );
         if (user.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Freelancer not found"
            });
        }
        const profile = await pool.query(
            `SELECT * FROM profiles WHERE user_id = $1`,[id]
        );
        res.json({
            success: true,
            user: user.rows[0],
            profile: profile.rows[0]
        });
    }catch(error){
        console.log(error);
        req.status(500).json({success:false,message:"Server Error"});
    }
};
exports.uploadResumeController = async(req,res)=>{
   try{
      const userId = req.user.id;
      if(!req.file){
        return res.status(400).json({
            success:false,
            message:"Please Upload a PDF"
        });
      }
      const resumePath = `/uploads/resumes/${req.file.filename}`;
      const result = await pool.query(
        `UPDATE profiles
        SET resume_url = $1
        WHERE user_id = $2
        RETURNING *`,[resumePath,userId]
      );
      res.json({
        success:true,
        message:"Resume uploaded successfully",
        profile:result.rows[0]
      });
   }catch(error){
    console.log(error);
    res.status(500).json({success:false,message:"Server Error"});
   }
};