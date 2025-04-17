import mongoose, { Document, Schema } from 'mongoose';

// Define the UserDocument interface for type-checking
interface UserDocument extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    mobNumber: string;
    email: string;
};

// Define the user schema
const userSchema = new Schema<UserDocument>({
  name: { 
    type: String, 
    required: true 
  },
  mobNumber: { 
    type: String, 
    required: true, 
    match: /^[0-9]{10}$/,  // Regex to match exactly 10 digits
    validate: {
      validator: function(v: string) {
        return /^[0-9]{10}$/.test(v); // Ensure it is exactly 10 digits
      },
      message: 'Mobile number must be 10 digits long.',
    }
  },
  email: { 
    type: String,
    required: true,
    unique: true, 
    match: /^\S+@\S+\.\S+$/
  },
});

// Create the User model based on the schema and interface
const User = mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);

// Export the User model and UserDocument interface
export { User };
export type { UserDocument };  // Use `export type` for the UserDocument type
