
import mongoose, { Document, Schema } from 'mongoose';

export interface Admin {
  id: string;
  username: string;
  password: string; // Store the hash, not the plain password
}


export interface IUser extends Document {
  username: string;
  password: string; // hashed password
}

const AdminSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const AdminModel = mongoose.models.Admin || mongoose.model<IUser>('Admin', AdminSchema);
