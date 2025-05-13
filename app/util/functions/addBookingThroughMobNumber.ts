import { User } from "@/app/models/User";
import { UserDocument } from "@/app/models/User";

import { NextResponse } from "next/server";
import { validateDate } from "./validateDate";
import { Booking } from "@/app/models/Booking";

/**
 * Create booking using mobile number.
 */
export async function addBookingThroughMobNumber(
    mobNumber: number,
    startDate: Date,
    totalBookingDays: number
): Promise<NextResponse> {
    const user: UserDocument | null = await User.findOne({ mobNumber });
    if (!user) {
        return NextResponse.json({ message: 'User Not Found' }, { status: 404 });
    }
    console.log(user)
    const isValid = await validateDate(startDate, totalBookingDays);
    if (!isValid) {
        return NextResponse.json({ message: 'Date conflicts with existing booking' }, { status: 409 });
    }

    const newBooking = new Booking({
        user: user._id,
        startDate:startDate,
        totalBookingDays:totalBookingDays,
    });


    try {
        await newBooking.save();
        return NextResponse.json({ message: 'Booking Saved' }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Error in Booking', error }, { status: 500 });
    }
}
