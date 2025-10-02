import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Fallback MongoDB URI if environment variable is not set
    const MONGODB_URI = process.env.MONGODB_URI || 
      'mongodb+srv://swaasthyam-admin:Pass123@swaasthyam-cluster.wck5to5.mongodb.net/swaasthyam?retryWrites=true&w=majority&appName=swaasthyam-cluster';
    
    console.log('🔍 Connecting to MongoDB...');
    console.log(`📍 URI exists: ${!!MONGODB_URI}`);
    
    const conn = await mongoose.connect(MONGODB_URI, {
      // These options are no longer needed in Mongoose 6+
      // but keeping them for compatibility
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error(`❌ MongoDB connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔒 MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

