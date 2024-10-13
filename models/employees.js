// models/Employee.js
const mongoose = require('mongoose');

const { ObjectId } = require('mongoose').Types;
const employeeSchema = new mongoose.Schema({
    "first_name": { type: String, required: true },
    'last_name': { type: String, required: true },
    "email": { type: String, required: true, unique: true },
    "position": { type: String, required: true },
    "salary": Number,
    "date_of_joining": { type: Date, default: Date.now },
    "department": { type: String, required: true },
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;