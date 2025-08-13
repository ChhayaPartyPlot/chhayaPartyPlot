import { Booking, BookingDocument } from '@/app/models/Booking';
import { connectToDatabase } from '@/app/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

type paramsType = {
    params:{
        bookingId: string
    }
}


/**
 * PATCH endpoint — update a booking partially.
 */
export async function PATCH(req: NextRequest, { params }: {paramsType} ) {
    await connectToDatabase();

    try {
        const body = await req.json();
        const {bookingId} = params;
        const { updateData } = body;

        if (!bookingId || !updateData) {
            return NextResponse.json(
                { message: 'bookingId and updateData are required' },
                { status: 400 }
            );
        }

        // Update booking in DB
        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { $set: updateData },
            { new: true } // Return updated document
        ).populate('user');

        if (!updatedBooking) {
            return NextResponse.json(
                { message: 'Booking not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedBooking, { status: 200 });
    } catch (error) {
        console.error('PATCH Error:', error);
        return NextResponse.json(
            { message: 'Failed to update booking', error },
            { status: 500 }
        );
    }
}

/**
 * DELETE endpoint — delete a booking by ID.
 */
export async function DELETE(req: NextRequest, { params }: {paramsType}) {
    await connectToDatabase();

    try {
        const {bookingId} = params;

        if (!bookingId) {
            return NextResponse.json(
                { message: 'bookingId is required' },
                { status: 400 }
            );
        }

        const deletedBooking = await Booking.findByIdAndDelete(bookingId);

        if (!deletedBooking) {
            return NextResponse.json(
                { message: 'Booking not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Booking deleted successfully', deletedBooking },
            { status: 200 }
        );
    } catch (error) {
        console.error('DELETE Error:', error);
        return NextResponse.json(
            { message: 'Failed to delete booking', error },
            { status: 500 }
        );
    }
}
