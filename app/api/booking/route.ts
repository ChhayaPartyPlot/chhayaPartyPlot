import { Booking } from '@/models/Booking';
import { BookingDocument } from '@/models/Booking';
import { NextRequest, NextResponse } from 'next/server';
import {connectToDatabase} from '@/lib/mongodb';
import { User } from '@/models/User';

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;
const MOB_NUMBER_PATTERN = /^[0-9]{10}$/;

async function vlidateDate(startDate:Date, totalBookingDays:Number): Promise<boolean> {

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + Number(totalBookingDays));

    const bookingStartDate = new Date(startDate.getFullYear(), startDate.getMonth() - 1, 1);

    const bookings: BookingDocument[] = await Booking.find({
        startDate: { $gte: bookingStartDate, $lte: endDate } 
    });

    for(const booking of bookings) {
        const bookingEndDate = new Date(booking.startDate);
        bookingEndDate.setDate(bookingEndDate.getDate() + booking.totalBookingDays);

        if ((startDate >= booking.startDate && startDate < bookingEndDate) || (endDate > booking.startDate && endDate <= bookingEndDate)) {
            return false; // Booking overlaps with an existing one
        }
    }
    return true;
}

async function addBookingThroughMobNumber(mobNumber: Number, startDate: Date, totalBookingDays:Number): Promise<NextResponse> {

    const user = await User.findOne({ mobNumber: mobNumber });
    if (!user) {
        return NextResponse.json('User Not Found',{ status: 404 });
    }

    const newBooking = new Booking({
        user: user._id,
        startDate: startDate,
        totalBookingDays: totalBookingDays
    });

    try{
        await newBooking.save();
        return NextResponse.json('Booking Saved',{ status: 200 });
    }catch(error){
        return NextResponse.json('Error in Booking',{ status: 500 });
    }
}

async function addBookingThroughEmail(email: string, startDate: Date, totalBookingDays:Number): Promise<NextResponse> {
    const user = await User.findOne({ email: email });
    if (!user) {
        return NextResponse.json('User Not Found',{ status: 404 });
    }
    const newBooking = new Booking({
        user: user._id,
        startDate: startDate,
        totalBookingDays: totalBookingDays
    });

    try{
        await newBooking.save();
        return NextResponse.json('Booking Saved',{ status: 200 });
    }catch(error){
        return NextResponse.json('Error in Booking',{ status: 500 });
    }
}


export async function GET(req: NextRequest) {

    await connectToDatabase();

    //retrive parameter from url -> month and year
    const { searchParams } = new URL(req.url);
    const month = Number(searchParams.get('month')) || new Date().getMonth(); // Default to current month if not provided
    const year = Number(searchParams.get('year')) || new Date().getFullYear(); // Default to current year if not provided

    //gereate date from month and year
    const startDate = new Date(`${year}-${month-1}-1`); 

    const endDate = new Date(year, month, 0); // End of the month

    //retrive data from database
    let bookings: BookingDocument[] = await Booking.find({
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

    const res = NextResponse.json(bookings, { status: 200 });
    return res;
}

export async function POST(req: NextRequest) {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);

    const mobNumber = Number(searchParams.get('mobNumber'));
    const email = searchParams.get('email');
    const startDate = new Date(searchParams.get('startDate') || new Date().toISOString());
    const totalBookingDays = Number(searchParams.get('totalBookingDays')) ||1;
    await vlidateDate(startDate,totalBookingDays);

    if (mobNumber && MOB_NUMBER_PATTERN.test(mobNumber.toString())) {
        let res = await addBookingThroughMobNumber(mobNumber, startDate, totalBookingDays);
        return res;
    } else if (email && EMAIL_PATTERN.test(email)) {
        let res = await addBookingThroughEmail(email, startDate, totalBookingDays);
        return res;
    } else {
        return NextResponse.json({ message: 'No parameters provided' }, { status: 400 });
    }
    
}
