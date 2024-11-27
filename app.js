// app.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/admin');
mongoose.connect('mongodb+srv://nishitasachdev95:Admin%401121@cluster0.ft341.mongodb.net/');

app.use(cors());
app.use(bodyParser.json());
// Define API endpoints
app.use('/api/v1/user', require('./routes/users'));
app.use('/api/v1/emp', require('./routes/employees'));

// Start the server
const port = 7070 ;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});