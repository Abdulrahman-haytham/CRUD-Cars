const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const passwordhash=require('password-hash');
const auth = require('../middlewares/auth.middleware');
const role=require('../middlewares/isAdmin.middleware');
const router = express.Router();

const jwt = require('jsonwebtoken');

const createtoken=(id)=>{
    return jwt.sign({id},process.env.SECRET_jwt_Key);
}
//create new user as admim
router.post('/create-admin',async (req, res) => {
    try{
        const {email,password,secret_key} = req.body;
        if(!secret_key||secret_key!="abd"){
            return res.status(400).json({message:"al data are requires"});
        }
        if(!email ||!password){
            return res.status(400).json({message:"Please provide email and password"});
        }
        if(typeof email !== 'string'){
            return res.status(400).json({message:"Email must be a string"});
        }
        if(typeof password !=='string'){
            return res.status(400).json({message:"Password must be a string"});
        }
       
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message:"Invalid email"});

        }
        const hashed=passwordhash.generate(password);
      

       let  admin=await User.findOne({role: 'admin'});
       if(admin){

        const isUniqueEmail=await User.findOne({email,_id:admin._id});
        if(isUniqueEmail){
            return res.status(400).json({message:"Email already exists"});
        }        admin.email=req.body.email;
        admin.password=req.body.password;
        await admin.save();
       }else{
         admin=await User.create({email:req.body.email, password:hashed,roles:"admin"});
       }
       //const token=createtoken(admin.id);

       return res.status(201).json({message:"created successfully",admin:admin});
    }catch(err){
        return res.status(500).json({message:err.message});    }

})


//sign up user
router.post('/signup',async (req, res) => {
    try{
        const {email,password} = req.body;
        if(!email ||!password){
            return res.status(400).json({message:"Please provide email and password"});
        }
        if(typeof email !== 'string'){
            return res.status(400).json({message:"Email must be a string"});
        }
        if(typeof password !=='string'){
            return res.status(400).json({message:"Password must be a string"});
        }
        const isUniqueEmail=await User.findOne({email});
        if(isUniqueEmail){
            return res.status(400).json({message:"Email already exists"});
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message:"Invalid email"});

        }
        const hashed=passwordhash.generate(password);

        const user = await User.create({email,password:hashed})

        const token=createtoken(user.id);

        return res.status(200).json({message:"created  successfully",token,user})
    }catch(err){
        return res.status(500).json({message:err.message});
    }

    
})


// log in user
router.post('/log',async(req,res) => {
    try {
     const {email,password} = req.body;
     if(!email ||!password){
        return res.status(400).json({message:"Please provide email and password"});
    }
    if(typeof email !== 'string'){
        return res.status(400).json({message:"Email must be a string"});
    }
    if(typeof password !=='string'){
        return res.status(400).json({message:"Password must be a string"});
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!emailRegex.test(email)){
        return res.status(400).json({message:"Invalid email"});
    }
    const user=await User.findOne({email: email})
    if(!user){
        return res.status(400).json({message:"User not found"});
    }
    const passwordVerified = passwordhash.verify(password,user.password);
    if(!passwordVerified){
        return res.status(400).json({message:"passsword or email not valid"});
    }
    const token=createtoken(user.id);



    return res.status(200).json({message:"login successful"},token,user);

    }catch(err){ 
        return res.status(500).json({message:err.message})
    };
})


//log out user
router.post('/logout',auth,async(req,res)=>{
    try{
      return res.status(200).json({message:"User logged out successfully"});
    }catch(err){
        return res.status(500).json({message:err.message});
    }

})
module.exports = router;
