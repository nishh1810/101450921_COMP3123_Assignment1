// models/User.js
const mongoose = require('mongoose');

const { ObjectId } = require('mongoose').Types;
const userSchema = new mongoose.Schema({
    "username": { type: String, required: true },   
    "email": { type: String, required: true, unique: true },
    "password": {type: String, required: true}, // This should be hashed
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

module.exports = User;