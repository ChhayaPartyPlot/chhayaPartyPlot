import cron from 'node-cron';
import { sendDailyReport } from '@/util/mailer/dailyReport';

cron.schedule('0 18 * * *', async () => {
  console.log('Running daily contact report at 6 PM');
  await sendDailyReport();
});