import mongoose, { Document, Schema } from "mongoose";

interface InquiryDocument extends Document {
  name: string;
  email: string;
  phone: string;
  startingDate: Date;
  totalBookingDays: number;
  eventType: string;
}

const inquirySchema = new Schema<InquiryDocument>({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    // required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  startingDate: {
    type: Date,
    required: true,
  },

  eventType: {
    type: String,
    required: true,
    enum: [
      "Wedding",
      "Birthday",
      "Corporate Event",
      "Engagement",
      "Reception",
      "Other",
    ],
  },

  totalBookingDays: {
    type: Number,
    default: 1,
    min: [1, "Booking days must be at least 1"],
  },
});

const Inquiry =
  mongoose.models.Inquiry ||
  mongoose.model<InquiryDocument>("Inquiry", inquirySchema);

export { Inquiry };
export type { InquiryDocument };
