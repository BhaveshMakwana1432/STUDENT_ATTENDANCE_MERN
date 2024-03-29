const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGODB_URI;
    await mongoose.connect(dbURI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

module.exports = connectDB;
