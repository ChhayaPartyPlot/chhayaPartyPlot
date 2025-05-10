import { User } from "@/app/models/User";
import { NextResponse } from "next/server";
import { validateDate } from "./validateDate";
import { Booking } from "@/app/models/Booking";

/**
 * Create booking using email.
 */
export async function addBookingThroughEmail(
    email: string,
    startDate: Date,
    totalBookingDays: number
): Promise<NextResponse> {
    const user = await User.findOne({ email });

    if (!user) {
        return NextResponse.json({ message: 'User Not Found' }, { status: 404 });
    }

    const isValid = await validateDate(startDate, totalBookingDays);
    if (!isValid) {
        return NextResponse.json({ message: 'Date conflicts with existing booking' }, { status: 409 });
    }

    const newBooking = new Booking({
        user: user._id,
        startDate,
        totalBookingDays,
    });

    try {
        await newBooking.save();
        return NextResponse.json({ message: 'Booking Saved' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error in Booking', error }, { status: 500 });
    }
}
