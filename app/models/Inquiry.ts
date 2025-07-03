import mongoose, { Document, Schema, Types } from 'mongoose';

interface InquiryDocument extends Document {
  name: string;              // Name of the user
  email: string;             // Email of the user
  phone: string;             // Phone number of the user
  startingDate: Date;              // Booking start date
  totalBookingDays: number;     // Total number of booking days
}

const inquirySchema = new Schema<InquiryDocument>({
  name:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    // required: true,
  },
  phone:{
    type: String,
    required: true,
  },
  startingDate: { 
    type: Date, 
    required: true 
  },
  totalBookingDays: { 
    type: Number, 
    default:1,
    min: [1, 'Booking days must be at least 1'],  // Ensure that at least 1 day is booked
  },
});

const Inquiry = mongoose.models.Inquiry || mongoose.model<InquiryDocument>('Inquiry', inquirySchema);

export {Inquiry};
export type { inquirySchema };
