import { Booking } from "@/app/models/Booking";
import { connectToDatabase } from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

/* UPDATE BOOKING */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectToDatabase();

  try {
    const { id } = await params; // ✅ required in Next.js 15

    const body = await req.json();
    const { updateData } = body;

    console.log("Update ID:", id);
    console.log("Update Data:", updateData);

    if (!id || !updateData) {
      return NextResponse.json(
        { message: "id and updateData required" },
        { status: 400 },
      );
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true },
    ).populate("user");

    if (!updatedBooking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error("PATCH error:", error);

    return NextResponse.json(
      { message: "Failed to update booking" },
      { status: 500 },
    );
  }
}

/* DELETE BOOKING */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectToDatabase();

  try {
    const { id } = await params; // ✅ required

    console.log("DELETE ID:", id);

    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("DELETE error:", error);

    return NextResponse.json(
      { message: "Failed to delete booking" },
      { status: 500 },
    );
  }
}
