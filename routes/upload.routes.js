const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');

//post

router.post('/', upload.single("image"),async(req,res)=>{
  try {
       const file=req.files;

       if (!file) {
         return res.status(400).json({ message: "No file uploaded" });
       }

       const path=file.path.replace(/\\g/, '/');
       return res.status(200).json({message:"Upload successful", data:path });
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
} )




module.exports=router;