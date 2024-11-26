const { default: mongoose } = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    role: {
        type: String,
        enum: ['Administrator', 'User'],  // This will allow only two roles
        default: 'User'  // Set a default role if needed
    }
}, {
    timestamps: true  // This will automatically add timestamps (createdAt, updatedAt)
}));

module.exports = User;
