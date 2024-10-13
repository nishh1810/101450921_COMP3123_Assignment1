// app.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/3123-assignment1');

app.use(bodyParser.json());
// Define API endpoints
app.use('/api/v1/user', require('./routes/users'));
app.use('/api/v1/emp', require('./routes/employees'));

// Start the server
const port = 8087 ;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});