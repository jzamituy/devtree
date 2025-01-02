import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    console.log('NODE_ENV', process.env.NODE_ENV)
    const {connection } = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected: ${connection.host}`);

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
