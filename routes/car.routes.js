const express = require('express');
const mongoose = require('mongoose');
const Car = require('../models/Car');
const auth = require('../middlewares/auth.middleware');
const role=require('../middlewares/isAdmin.middleware');
// require('../middlewares/isUser');
require('../middlewares/auth.middleware')
const router = express.Router();

// GET all cars
router.get('/all', async (req, res) => {
    try {
        const data = await Car.find({ active: true });
        return res.status(200).json({ message: "Get all data successfully", data });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Edit a car's active status
router.put('/:action/:id',[auth,role("admin")], async (req, res) => {
    try {
        const { action, id } = req.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const isActive = action === 'activate';
        const car = await Car.findByIdAndUpdate(id, { active: isActive }, { new: true });

        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        const message = isActive ? "Car activated successfully" : "Car deactivated successfully";
        return res.status(200).json({ message, data: car });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// GET one car by ID
router.get('/one/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }
        return res.status(200).json({ message: "Get car successfully", data: car });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// POST add a new car
router.post('/add',[auth,role("admin")] ,async (req, res) => {
    try {
        const datacar = req.body;

        // Check if title is unique
        const isUnique = await Car.findOne({ title: datacar.title });
        if (isUnique) {
            return res.status(400).json({ message: "Title already exists" });
        }

        // Validate required fields and data types
        const validationError = validateCarData(datacar);
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }

        // Add new car to the database
        const addedCar = await Car.create(datacar);
        return res.status(201).json({ message: "Car added successfully", data: addedCar });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// PUT update a car by ID
router.put('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Validate the ID
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        // Check if the car exists
        const car = await Car.findById(id);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        // Merge current data with new data if provided
        const { title = car.title, brad = car.brad, price = car.price, description = car.description, color = car.color } = req.body;

        // Validate required fields and data types
        const validationError = validateCarData({ title, brad, price, description, color });
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }

        // Ensure title is unique
        const isTitleUnique = await Car.findOne({ title, _id: { $ne: id } });
        if (isTitleUnique) {
            return res.status(400).json({ message: "Title already exists" });
        }

        // Update car data
        const updatedCar = await Car.findByIdAndUpdate(id, { title, brad, price, description, color }, { new: true });
        return res.status(200).json({ message: "Car updated successfully", data: updatedCar });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// DELETE a car by ID
router.delete('/delete/:id',[auth,role("admin")], async (req, res) => {
    try {
        const { id } = req.params;

        // Validate the ID
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        // Find and delete the car
        const deletedCar = await Car.findByIdAndDelete(id);
        if (!deletedCar) {
            return res.status(404).json({ message: "Car not found" });
        }

        return res.status(200).json({ message: "Car deleted successfully", data: deletedCar });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Function to validate car data
function validateCarData({ title, brad, price, description, color,image }) {
    if (!title || !brad || !price || !description || !color  || !image) {
        return "All fields must be provided";
    }
    if (typeof title !== 'string') return "Title must be a string";
    if (typeof brad !== 'string') return "Brand must be a string";
    if (typeof price !== 'number') return "Price must be a number";
    if (typeof description !== 'string') return "Description must be a string";
    if (typeof color !== 'string') return "Color must be a string";
    if (brad !== 'AUDI' && brad !== 'BMW') return "Brand must be either AUDI or BMW";
    if (typeof image !== 'string') return "image must be a string";

    return null; // No errors
}

module.exports = router;
