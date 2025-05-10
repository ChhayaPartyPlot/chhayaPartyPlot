import { Booking, BookingDocument } from '@/app/models/Booking';
import { connectToDatabase } from '@/app/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { addBookingThroughMobNumber } from '@/app/util/functions/addBookingThroughMobNumber';
import { addBookingThroughEmail } from '@/app/util/functions/addBookingThroughEmail';

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;
const MOB_NUMBER_PATTERN = /^[0-9]{10}$/;



/**
 * GET endpoint — retrieve bookings for a given month & year.
 */
export async function GET(req: NextRequest) {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const month = Number(searchParams.get('month')) || new Date().getMonth() + 1; // JS months are 0-based
    const year = Number(searchParams.get('year')) || new Date().getFullYear();

    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(year, month, 0); // Last day of the month

    try {
        const bookings: BookingDocument[] = await Booking.find({
            $or: [
                {
                    startDate: { $lte: endDate },
                    $expr: {
                        $gt: [
                            { $add: ["$startDate", { $multiply: ["$totalBookingDays", 86400000] }] },
                            startDate
                        ]
                    }
                }
            ]
        });

        return NextResponse.json(bookings, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch bookings', error }, { status: 500 });
    }
}

/**
 * POST endpoint — create a booking using mobile number or email.
 */
export async function POST(req: NextRequest) {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const mobNumber = Number(searchParams.get('mobNumber'));
    const email = searchParams.get('email');
    const startDate = new Date(searchParams.get('startDate') || new Date());
    const totalBookingDays = Number(searchParams.get('totalBookingDays')) || 1;

    if (mobNumber && MOB_NUMBER_PATTERN.test(mobNumber.toString())) {
        return await addBookingThroughMobNumber(mobNumber, startDate, totalBookingDays);
    } else if (email && EMAIL_PATTERN.test(email)) {
        return await addBookingThroughEmail(email, startDate, totalBookingDays);
    } else {
        return NextResponse.json({ message: 'Invalid or missing parameters' }, { status: 400 });
    }
}
