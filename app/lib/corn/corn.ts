import { sendDailyReport } from '../../util/mailer/dailyReport';
// import { } from '@/util/mailer/mailer';

import cron from 'node-cron';


// Function to initialize the cron job
export function startCronJob() : void{
  // Schedule the task to run every day at a specified time (e.g., at 8:00 AM server time)
  cron.schedule('0 9 * * *', async () => {
    try {
      console.log('Sending daily report...');
      await sendDailyReport();
      console.log('Daily report sent successfully!');
    } catch (error) {
      console.error('Error sending daily report:', error);
    }
  });
}
