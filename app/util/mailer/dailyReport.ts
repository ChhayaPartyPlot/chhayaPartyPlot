import { connectToDatabase } from '@/lib/mongodb';
import {Inquiry} from '@/models/Inquiry';
import { sendDailyEmail } from '@/util/mailer/mailer';

export async function sendDailyReport() {
  await connectToDatabase();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const submissions = await Inquiry.find({
    createdAt: { $gte: today, $lt: tomorrow },
  }).lean();

  if (submissions.length > 0) {
    await sendDailyEmail(submissions);
  }
}
