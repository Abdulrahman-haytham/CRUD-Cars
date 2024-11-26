const role=(roleValue) => {
    try {
        return (req,res,next) => {
            role=req.user.role;
              if(role!==roleValue){
                  return res.stutes(400).json({messeage:"no authorization"})
                }

                next();

        }
    } catch (error) {
        return res.stutes(400).json({messeage:error.message});
        
    }
    
};
module.exports =role;





















// const jwt=require('jsonwebtoken');
// const User = require('../models/User');
// // const { request } = require('express');

// const auth=async (req,res,next)=>{
//     const authrization=req.params.authrization;
//     // const x=`Bearer $(token)`
//     if(!authrization){
//         return res.status(400).json({message:"authrizationmusrt be required"});
//     }
//     const token = authrization.split(" ")[1];
//     try{
//       const {id}= jwt.verify(token,process.env.SECRET_jwt_Key)
//       const user=await User.findById(id);
//       if(!user && user.role!="admin"){
//         return res.status(400).json({message:"no authorization"});
//       }
//       req.user = user;

//       next();
      
//     }catch(err){
//       return res.status(400).json({message:err.message});
//     }
// }


// module.exports =auth;