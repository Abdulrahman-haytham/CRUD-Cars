// const express = require('express');
// const Car = require('../models/Car');
// const router = express.Router();

// // GET all cars
// router.get('/all', async (req, res) => {
//     try {
//         const data = await Car.find({actave: true});
//         return res.status(200).json({ message: "Get all data successfully", data: data });
//     } catch (err) {
//         return res.status(500).json({ message: err.message });
//     }
// });
// // edit a car active status

// router.put('/activate/:id', async (req, res) => {
//     try {
//          const id = req.params.id;
//          if (!id || !mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ message: "Invalid id" });
//          }
//          const car = await Car.findByIdAndUpdate(id, { active: true }, { new: true });
//          if (!car) {
//               return res.status(404).json({ message: "Car not found" });
//          }
//          return res.status(200).json({ message: "Update car successfully", data: car });
//     } catch (err) {
//          return res.status(500).json({ message: err.message });
//     }
//   });
//   router.put('/disactivate/:id', async (req, res) => {
//     try {
//          const id = req.params.id;
//          if (!id || !mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ message: "Invalid id" });
//          }
//          const car = await Car.findByIdAndUpdate(id, { active: false }, { new: true });
//          if (!car) {
//               return res.status(404).json({ message: "Car not found" });
//          }
//          return res.status(200).json({ message: "Update car successfully", data: car });
//     } catch (err) {
//          return res.status(500).json({ message: err.message });
//     }
//   });
  

// // GET one car by ID
// router.get('/one/:id', async (req, res) => {
//     try {
//         const car = await Car.findById(req.params.id);
//         if (!car) {
//             return res.status(404).json({ message: "Car not found" });
//         }
//         return res.status(200).json({ message: "Get car successfully", data: car });
//     } catch (err) {
//         return res.status(500).json({ message: err.message });
//     }
// });

// // POST add a new car
// router.post('/add', async (req, res) => {
//     try {
//         const datacar= (req.body);
//         const isUnique =await Car.findOne(req.body.title)
//         if(isUnique) {
//             return res.status(400).json({ message:"title already exists"})
//         }
//         if(typeof datacar.title!='string'){
//             return res.status(400).json({ message: "title must be a string" });
//         }
//         if(typeof datacar.brad!='string'){
//             return res.status(400).json({ message: "brad must be a string" });
//         }
//         if(typeof datacar.price!='number'){
//             return res.status(400).json({ message: "price must be a number" });
//         }
//         if(typeof datacar.description!='string'){
//             return res.status(400).json({ message: "description must be a string" });
//         }
//         if(typeof datacar.color!='string'){
//             return res.status(400).json({ message: "color must be a string" });
//         }
//         // const isUnique = await Car.findOne({title: data.title, _id: { $ne: id } })
//         // if(isUnique) {
//         //     return res.status(400).json({ message:"title already exists"})
//         // }
//         if(datacar.brad=='AUDI' || data.brad=='BMW'){
//             return res.status(400).json({ message: "brad must be AUDI or BMW" });
//         }
        
//         const addedcar = await Car.create(datacar);
//         return res.status(201).json({ message: "Car added successfully", data: addedcar });
//     } catch (err) {
//         return res.status(500).json({ message: err.message });
//     }
// });

// // PUT update a car by ID
// router.put('/edit/:id', async (req, res) => {
//     try {
//         const id=req.params.id;
//         if(!id ||!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ message: "Invalid id" });
//         }
//         const updatedCar = await Car.findById(req.params.id);
//         if (!updatedCar) {
//             return res.status(404).json({ message: "Car not found" });
//         }
//         const data={title: updatedCar.title, brad: updatedCar.brad, price: updatedCar.price, description: updatedCar.description, color: updatedCar.color  };
        
//         if(!data.title ||!data.brad ||!data.price ||!data.description ||!data.color  ) {
//             return res.status(400).json({ message: "all filed must be required" });
//         }
//         if(typeof data.title!='string'){
//             return res.status(400).json({ message: "title must be a string" });
//         }
//         if(typeof data.brad!='string'){
//             return res.status(400).json({ message: "brad must be a string" });
//         }
//         if(typeof data.price!='number'){
//             return res.status(400).json({ message: "price must be a number" });
//         }
//         if(typeof data.description!='string'){
//             return res.status(400).json({ message: "description must be a string" });
//         }
//         if(typeof data.color!='string'){
//             return res.status(400).json({ message: "color must be a string" });
//         }
//         const isUnique = await Car.findOne({title: data.title, _id: { $ne: id } })
//         if(isUnique) {
//             return res.status(400).json({ message:"title already exists"})
//         }
//         if(data.brad=='AUDI' || data.brad=='BMW'){
//             return res.status(400).json({ message: "brad must be AUDI or BMW" });
//         }
//         const datacar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         return res.status(200).json({ message: "Car updated successfully", data: datacar });
//     } catch (err) {
//         return res.status(500).json({ message: err.message });
//     }
// });

// // DELETE a car by ID
// router.delete('/delete/:id', async (req, res) => {
//     try {
//         const id=req.params.id;
//         if(!id ||!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ message: "Invalid id" });
//         }
//         const deletedCar = await Car.findByIdAndDelete(req.params.id);
//         if (!deletedCar) {
//             return res.status(404).json({ message: "Car not found" });
//         }
//         return res.status(200).json({ message: "Car deleted successfully", data: deletedCar });
//     } catch (err) {
//         return res.status(500).json({ message: err.message });
//     }
// });

// module.exports = router;
// /////////////
// const express = require('express');
// require('dotenv').config();

// const app=express();
// // 
// const logger = require('morgan');
// app.use(logger('dev'));

// const carRouter=require('./routes/car.routes');

// app.use('/api/cars',carRouter);
// app.use(express.json());

// app.use('*',()=>res.statuse(400).json({message:"invaled api"}));


// // connect to data base
// const mongoose=require('mongoose');

// mongoose.connect(process.env.MONGOURL)
//    .then(res=>{
//     console.log("connectionis successfully to =>>>>>>>>   " + process.env.MONGOURL);
//     app.listen(process.env.PORT , console.log("app is listen on port ==>>>>>>>>> "+process.env.PORT))
//     })
//    .catch(err=>{
//     console.error(err.message);
//    })