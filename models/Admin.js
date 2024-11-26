const { default: mongoose } = require('mongoose');

const Admin = mongoose.model('Admin', new mongoose.Schema({
 
}, {
    timestamps: true  // This will automatically add timestamps (createdAt, updatedAt)
}));

module.exports = Admin;
