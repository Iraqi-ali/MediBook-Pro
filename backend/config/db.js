const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error('❌ MONGO_URI is not set. Please configure in Render environment variables or backend/.env');
    console.error("Example: mongodb+srv://user:password@cluster0.tc96wxl.mongodb.net/database?retryWrites=true&w=majority");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      retryWrites: true,
    });
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('Ensure MongoDB Atlas IP whitelist includes your Render region or 0.0.0.0/0');
    process.exit(1);
  }
};

module.exports = connectDB;
