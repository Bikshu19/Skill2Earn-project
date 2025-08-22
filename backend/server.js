const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const route = require('./routes/userroute');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// IMPORTANT:
// Do NOT use bodyParser.json() for multipart/form-data routes
// Keep JSON parser to handle other JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Mount your routes
app.use('/api', route);

// Global error handler (to always respond with JSON errors)
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

// Test route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
