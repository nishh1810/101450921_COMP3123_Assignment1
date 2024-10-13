const { check, validationResult } = require('express-validator');

const validateUser = [
  check('username').isLength({ min: 3, max: 50 }),
  check('email').isEmail(),
  check('password').isLength({ min: 8, max: 128 }),
];

const validateEmployee = [
  check('name').isLength({ min: 3, max: 50 }),
  check('email').isEmail(),
  check('department').isLength({ min: 3, max: 50 }),
];

const validateLogin = [
  check('username').exists().withMessage('Username is required'),
  check('password').exists().withMessage('Password is required'),
];

const validateEmployeeUpdate = [
  check('name').optional().isLength({ min: 3, max: 50 }),
  check('email').optional().isEmail(),
  check('department').optional().isLength({ min: 3, max: 50 }),
];

const validateUserUpdate = [
  check('username').optional().isLength({ min: 3, max: 50 }),
  check('email').optional().isEmail(),
  check('password').optional().isLength({ min: 8, max: 128 }),
];

module.exports = { 
  validateUser, 
  validateEmployee, 
  validateLogin, 
  validateEmployeeUpdate, 
  validateUserUpdate 
};