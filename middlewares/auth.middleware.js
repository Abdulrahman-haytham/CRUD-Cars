const jwt=require('jsonwebtoken');
const User = require('../models/User');
// const { request } = require('express');

const auth=async (req,res,next)=>{
    const authrization=req.header.authrization;
    // const x=`Bearer $(token)`
    if(!authrization){
        return res.status(400).json({message:"authrizationmusrt be required"});
    }
    const token = authrization.split(" ")[1];
    try{
      const {id}= jwt.verify(token,process.env.SECRET_jwt_Key)
      const user=await User.findById(id);
      if(!user){
        return res.status(400).json({message:"no authorized"});
      }
      req.user = user;

      next();
      
    }catch(err){
      return res.status(500).json({message:err.message});
    }
}


module.exports =auth;