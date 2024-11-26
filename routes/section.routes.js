const express = require('express');
const app = express();
const Section = require('../models/section');
const router = express.Router();


// Get
router.get('/all', async(req, res)=>{
    try {
        const section= await Section.find({});
        return res.status(200).json({message:"Get succefully",data: section});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/filtert-by-section/:title', async(req, res)=>{
    try {

        const title = req.params.title;
        if(!title){
            return res.status(404).json({ message:"No title"});
        }
        const section= await Section.findOne({ title});
        if(!section){
            return res.status(404).json({ message:"no section found"});
        }
        const carIds=section.carId
        const cars =await Promise.all(carIds.map(async (carId) =>{
            const car = await Car.findById(carId);
            return car;
        }))
        return res.status(200).json({message:"Get succefully",data: car});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Post
router.post('/add',async (req, res)=>{
    try {
        const title = req.body.title;
        if (!title){
            return res.status(400).json({message:"Please provide title"});
        }
        if(typeof title!="string"){
            return res.status(400).json({message:"Title must be a string"});
        }
        const section= await Section.create({title: title});
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put('/add-car/:id',async (req, res)=>{
    try {
        const id=req.params.id;
        const carId=req.body.carId;
        if(!id){
            return res.status(400).json({message:"Please provide id"});
        }
        const section= await Section.findById(id);
        if(!section){
            return res.status(404).json({message:"Section not found"});
        }
        section.carId.push(carId);
        section.save();
        return res.status(200).json({message:"Success"});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// 

module.exports=router;