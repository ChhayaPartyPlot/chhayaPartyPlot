import { Booking, BookingDocument } from "@/app/models/Booking";

/**
 * Check if a new booking overlaps with existing ones.
 */
export async function validateDate(startDate: Date, totalBookingDays: number): Promise<boolean> {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + totalBookingDays);

    const bookingStartDate = new Date(startDate.getFullYear(), startDate.getMonth() - 1, 1);

    const bookings: BookingDocument[] = await Booking.find({
        startDate: { $gte: bookingStartDate, $lte: endDate },
    });

    for (const booking of bookings) {
        const bookingEndDate = new Date(booking.startDate);
        bookingEndDate.setDate(bookingEndDate.getDate() + booking.totalBookingDays);

        const isOverlap = startDate < bookingEndDate && endDate > booking.startDate;
        if (isOverlap) {
            return false; // Overlap detected
        }
    }

    return true;
}
