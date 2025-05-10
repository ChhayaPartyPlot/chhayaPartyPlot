import mongoose from 'mongoose';
import { loadEnvConfig } from '@next/env';

// // Load environment variables (optional, as Next.js does this automatically in most cases)
// loadEnvConfig(process.cwd());
// // Check if the environment variable is defined


// console.log(process.env)
// const MONGO_URI = process.env.MONGO_URL!;


// if (!MONGO_URI) {
//   throw new Error('Please define the MONGO_URI environment variable');
// }
const MONGO_URI = process.env.MONGO_URL || 'mongodb://localhost:27017/chhayapartyplot'; 


let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    console.log('Already connected to MongoDB');
    return;
  }

  try {
     // Log the Mongo URI for debugging

    await mongoose.connect(MONGO_URI);

    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);  // Exit process with failure
  }
};
