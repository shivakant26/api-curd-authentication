const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGOBD_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Optional: Handle connection events
const db = mongoose.connection;
db.on('error', (error) => console.error('Connection error:', error));
db.once('open', () => console.log('Connected to MongoDB!'));

module.exports = db;
