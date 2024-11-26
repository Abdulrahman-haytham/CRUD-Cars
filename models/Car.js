const { default: mongoose } = require('mongoose');

const Car = mongoose.model('Car', new mongoose.Schema({
    title: {
        type: String,
        required: true, 
        unique: true
    },
    // title1:{
    //     type: String,
    //     // enam:['sport','economy','family'],
    //     required: true
    // },
    brad: {  
        type: String,
        enum: ['AUDI', 'BMW'],
        required: true  
    },
    price: {
        required: true,
        type: Number
    },
    description: {  
        type: String,
        required: true
    },
    color: {
        type: String,
        default: "Black"
    },
    active: {  
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        required: true
    },
}, {
    timestamps: true  // This will automatically add timestamps (createdAt, updatedAt)
}));

module.exports = Car;
