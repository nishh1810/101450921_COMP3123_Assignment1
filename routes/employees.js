const express = require('express');
const router = express.Router();
const Employee = require('../models/employees');
const { validateEmployee } = require('../validation');

// Create a new employee
router.post('/employees', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json({
      "message": "Employee created successfully.",
      "employee_id": employee._id
});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Retrieve all employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(400).json({ error: 'Failed to retrieve employees' });
  }
});

// Retrieve a single employee by ID
router.get('/employees/:eid', async (req, res) => {
  try {
    const eid = req.params.eid;
    const employee = await Employee.findById(eid);
    if (!employee) {
      res.status(404).json({ error: 'Employee not found' });
    } else {
      res.status(200).json(employee);
    }
  } catch (err) {
    res.status(400).json({ error: 'Failed to retrieve employee' });
  }
});

// Update an existing employee
router.put('/employees/:eid', validateEmployee, async (req, res) => {
  try {
    const eid = req.params.eid;
    const employee = await Employee.findByIdAndUpdate(eid, req.body, { new: true });
    res.status(200).json({"message":"Employee details updated successfully."});
  } catch (err) {
    res.status(400).json({ error: 'Failed to update employee' });
  }
});

// Delete an employee
router.delete('/employees/:eid', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.eid);
    // if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json({"message":"Employee deleted successfully."});
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete employee' });
  }
});

module.exports = router;