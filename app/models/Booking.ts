import mongoose, { Document, Schema } from "mongoose";
 
interface BookingDocument extends Document {
  user: mongoose.Types.ObjectId;
  startDate: Date;
  totalBookingDays: number;
  eventType: string; // ✅ added
}
 
const bookingSchema = new Schema<BookingDocument>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
 
  startDate: {
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
    required: true,
    min: [1, "Booking days must be at least 1"],
  },
});
 
const Booking =
  mongoose.models.Booking ||
  mongoose.model<BookingDocument>("Booking", bookingSchema);
 
export { Booking };
export type { BookingDocument };
 