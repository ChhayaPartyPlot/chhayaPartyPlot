import { connectToDatabase } from "@/app/lib/mongodb";
import { sendInquiryEmail } from "@/app/lib/sendInquiryEmail";
import { Inquiry } from "@/app/models/Inquiry";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const InquiryValidationSchema = z.object({
  name: z.string(),
  // email: z.string().email(),
  phone: z.string(),
  startingDate: z.string(),
  totalBookingDays: z.number().optional().default(1),

  eventType: z.string(), // ✅ added
  customEvent: z.string().optional(), // ✅ added
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    let {
      name,
      phone,
      startingDate,
      totalBookingDays,
      eventType,
      customEvent,
    } = InquiryValidationSchema.parse(body);

    // Handle "Other" event type
    if (eventType === "Other" && customEvent) {
      eventType = customEvent;
    }

    await connectToDatabase();

    let inq = await Inquiry.create({
      name,
      phone,
      startingDate,
      totalBookingDays,
      eventType,
    });

    // ✅ SEND EMAIL IMMEDIATELY
    await sendInquiryEmail({
      name,
      phone,
      startingDate,
      totalBookingDays,
      eventType,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    if (err.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: err.errors },
        { status: 400 },
      );
    }

    console.error("Error:", err);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function GET() {
  await connectToDatabase();
  const inquiries = await Inquiry.find().lean();
  return NextResponse.json(inquiries);
}
