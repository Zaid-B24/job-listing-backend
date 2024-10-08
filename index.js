// Import required packages
require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");
// Import routes
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/job');

// Create Express app
const app = express();

// Middleware - Enable CORS
app.use(cors());

// Middleware - Parse JSON request body
app.use(bodyParser.json());

// Middleware - Parse URL-encoded request body
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB using Mongoose
mongoose.connect(`${process.env.MONGODB_URL}/job_location`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/job', jobRoutes);
// app.get("/", async(req, res)=>{
//     res.status(200).json("Server is up and running")
// })



app.get("/", (req, res) => {
app.use(express.static(path.resolve(__dirname, "dist")));
res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});
// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});



// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
