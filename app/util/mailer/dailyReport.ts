import { connectToDatabase } from '../../lib/mongodb';
import {Inquiry} from '../../models/Inquiry';
import { sendDailyEmail } from '../../util/mailer/mailer';

export async function sendDailyReport() : Promise<void> {
  console.log('Running daily report');  
  await connectToDatabase();

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Today at 00:00

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1); // Yesterday at 00:00

  const submissions = await Inquiry.find({
    // createdAt: { $gte: yesterday, $lt: today },
  }).lean();



  if (submissions.length > 0) {
    await sendDailyEmail(submissions);
  }
}
