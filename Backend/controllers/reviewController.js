const pool = require("../config/db");
const getHomeTestimonials = async(req,res)=>{
    try{
        const result = await pool.query(
            `SELECT 
            users.full_name,
            reviews.rating,
            reviews.review
            FROM reviews
            JOIN users 
            ON reviews.client_id = users.id
            ORDER BY reviews.created_at DESC
            LIMIT 3`
        );
        res.json({
            testimonials:result.rows
        });
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Server Error"});
    }
};
module.exports = {
    getHomeTestimonials
};