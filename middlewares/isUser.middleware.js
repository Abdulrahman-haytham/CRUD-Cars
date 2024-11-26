const role=(roleValue) => {
    try {
        return (req,res,next) => {
            role=req.user.role;
            if(role==roleValue){
                next();
    
            }
            return res.stutes(400).json({messeage:"no authorization"})
        }
    } catch (error) {
        return res.stutes(400).json({messeage:error.message});
        
    }
    
};
module.exports =role;