import mongoose, { Document, Schema, Types } from 'mongoose';

interface BookingDocument extends Document {
  // _id: mongoose.Types.ObjectId;  // Unique identifier for the booking
  user: mongoose.Types.ObjectId;        // Reference to User model (_id)
  startDate: Date;              // Booking start date
  totalBookingDays: number;     // Total number of booking days
}

const bookingSchema = new Schema<BookingDocument>({
  // _id:{
  //   type : mongoose.Schema.Types.ObjectId,
  // },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  startDate: { 
    type: Date, 
    required: true 
  },
  totalBookingDays: { 
    type: Number, 
    required: true,
    min: [1, 'Booking days must be at least 1'],  // Ensure that at least 1 day is booked
  },
});

// Virtual property to calculate the `endDate` based on `startDate` and `totalBookingDays`
// bookingSchema.virtual('endDate').get(function(this: BookingDocument) {
//   const endDate = new Date(this.startDate);
//   endDate.setDate(endDate.getDate() + this.totalBookingDays);  // Add totalBookingDays to startDate
//   return endDate;
// });

const Booking = mongoose.models.Booking || mongoose.model<BookingDocument>('Booking', bookingSchema);

export {Booking};
export type { BookingDocument };
