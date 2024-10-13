const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { validateUser  } = require('../validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: 'Failed to retrieve users' });
  }
});

// POST /api/v1/user/signup
router.post('/signup', async (req, res) => {
    try {
      await User.deleteMany({});
      const { username, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = new User({ 
        username,
        email,
        password: hashedPassword // Save the hashed password
      });

      await user.save();
      console.log("User craeted sucessfully", user)
      res.status(201).json({"message":"User created successfully.",  "user_id": user._id});
    } catch (error) {
      console.log(`Signup api error --- ${error}`);
      res.status(400).json({ message: 'Error creating user' });
    }
  });
  
  // POST /api/v1/user/login
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Invalid email or password' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });
  
      // Create JWT
      const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
      res.json({ "message":"Login successful.",  "jwt_token":token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;