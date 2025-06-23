import mongoose from 'mongoose';

const connectDB = async () => {
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) {
    console.error("❌ MONGO_URL is not set. Please set it as an environment variable.");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB Atlas...');
  } catch (err) {
    console.error(`❌ MongoDB connection error: ${err}`);
    process.exit(1);
  }
};

export default connectDB;
