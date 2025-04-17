import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import {Inquiry} from '@/models/Inquiry';
import { saveContactSubmission } from '@/util/storage/storage'; // if you're using this
import { z } from 'zod';

const InquirySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  startingDate: z.string(),
  totalBookingDays: z.number().optional().default(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, startingDate, totalBookingDays } = InquirySchema.parse(body);

    await connectToDatabase();
    await Inquiry.create({ name, email, phone, startingDate, totalBookingDays });

    saveContactSubmission({ name, email, phone, startingDate, totalBookingDays }); // optional local storage
    return NextResponse.json({ success: true });
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation failed', details: err.errors }, { status: 400 });
    }

    console.log('Error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function GET() {
  await connectToDatabase();
  const inquiries = await Inquiry.find().lean();
  return NextResponse.json(inquiries);
}
