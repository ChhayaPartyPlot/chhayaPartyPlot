"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
var mongoose_1 = require("mongoose");
var bookingSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
        min: [1, 'Booking days must be at least 1'], // Ensure that at least 1 day is booked
    },
});
// Virtual property to calculate the `endDate` based on `startDate` and `totalBookingDays`
// bookingSchema.virtual('endDate').get(function(this: BookingDocument) {
//   const endDate = new Date(this.startDate);
//   endDate.setDate(endDate.getDate() + this.totalBookingDays);  // Add totalBookingDays to startDate
//   return endDate;
// });
var Booking = mongoose_1.default.models.Booking || mongoose_1.default.model('Booking', bookingSchema);
exports.Booking = Booking;
