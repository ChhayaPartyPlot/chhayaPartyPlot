import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/chhayaPartyplot';

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable');
}

let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    console.log('Already connected to MongoDB');
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });

    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);  // Exit process with failure
  }
};
