import {transporter} from '../../lib/mailer'

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export async function sendDailyEmail(submissions: any[]) {
    const formattedRows = submissions.map((s, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${s.name}</td>
        <td>${s.email}</td>
        <td>${s.phone || ''}</td>
        <td>${formatDate(s.startingDate)}</td>
        <td>${s.totalBookingDays}</td>
      </tr>
    `).join('');
  
    const html = `
      <h2>Daily Contact Form Submissions</h2>
      <table border="1" cellpadding="5" cellspacing="0">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Starting Date</th>
            <th>Total Booking Days</th>
          </tr>
        </thead>
        <tbody>${formattedRows}</tbody>
      </table>
    `;
  
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: 'Daily Contact Form Summary',
      html,
    });
  }