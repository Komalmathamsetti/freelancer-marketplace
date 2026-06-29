exports.clientDashboard = (req,res) => {
   res.json({success:true,message:"Welcome Client",user:req.user});
}
exports.freelancerDashboard = (req,res) => {
   res.json({success:true,message:"Welcome Freelancer",user:req.user});
}
exports.adminDashboard = (req,res) => {
   res.json({success:true,message:"Welcome Admin",user:req.user});
}
