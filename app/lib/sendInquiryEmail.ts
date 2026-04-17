import nodemailer from "nodemailer";

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export async function sendInquiryEmail(data: {
  name: string;
  phone: string;
  startingDate: string;
  totalBookingDays: number;
  eventType: string;
}) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const html = `
<div style="
  font-family: Arial, Helvetica, sans-serif;
  background-color: #f3f4f6;
  padding: 24px;
">

  <div style="
    max-width: 600px;
    margin: auto;
    background: white;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid #e5e7eb;
    box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  ">

    <!-- Header -->

    <div style="
      background: linear-gradient(to right, #c3ca6d, #7a8740);
      padding: 24px;
      text-align: center;
      color: white;
    ">

      <h2 style="
        margin: 0;
        font-size: 22px;
        letter-spacing: 0.5px;
      ">
        Chhaya Party Plot
      </h2>

      <p style="
        margin-top: 6px;
        font-size: 14px;
        opacity: 0.95;
      ">
         New Event Enquiry Received
      </p>

    </div>

    <!-- Body -->

    <div style="padding: 24px;">

      <p style="
        font-size: 16px;
        margin-bottom: 18px;
        color: #374151;
      ">
        A new enquiry has been submitted with the following details:
      </p>

      <table style="
        width: 100%;
        border-collapse: collapse;
        font-size: 15px;
      ">

        <tr>
          <td style="padding:12px;font-weight:bold;border-bottom:1px solid #e5e7eb;">
            Name
          </td>
          <td style="padding:12px;border-bottom:1px solid #e5e7eb;">
            ${data.name}
          </td>
        </tr>

        <tr>
          <td style="padding:12px;font-weight:bold;border-bottom:1px solid #e5e7eb;">
            Phone
          </td>
          <td style="padding:12px;border-bottom:1px solid #e5e7eb;">
            ${data.phone}
          </td>
        </tr>

        <tr>
          <td style="padding:12px;font-weight:bold;border-bottom:1px solid #e5e7eb;">
            Event Date
          </td>
          <td style="
            padding:12px;
            border-bottom:1px solid #e5e7eb;
            color:#7a8740;
            font-weight:bold;
          ">
            ${formatDate(new Date(data.startingDate))}
          </td>
        </tr>

        <tr>
          <td style="padding:12px;font-weight:bold;border-bottom:1px solid #e5e7eb;">
            Event Type
          </td>
          <td style="padding:12px;border-bottom:1px solid #e5e7eb;">
            ${data.eventType}
          </td>
        </tr>

        <tr>
          <td style="padding:12px;font-weight:bold;">
            Total Days
          </td>
          <td style="padding:12px;">
            ${data.totalBookingDays}
          </td>
        </tr>

      </table>

      <!-- Action Buttons -->

      <div style="
        text-align:center;
        margin-top: 24px;
      ">

        <!-- Call Button -->

        <a href="tel:${data.phone}" 
           style="
             background:#7a8740;
             color:white;
             padding:12px 20px;
             text-decoration:none;
             border-radius:8px;
             font-weight:bold;
             margin-right:8px;
             display:inline-block;
           ">
            Call Customer
        </a>

        <!-- WhatsApp Button -->

        <a href="https://wa.me/91${data.phone}" 
           style="
               background:#7a8740;
             color:white;
             padding:12px 20px;
             text-decoration:none;
             border-radius:8px;
             font-weight:bold;
             margin-right:8px;
             display:inline-block;
           ">
            WhatsApp
        </a>

      </div>

    </div>

    <!-- Footer -->

    <div style="
      background-color: #f9fafb;
      padding: 18px;
      text-align: center;
      font-size: 13px;
      color: #6b7280;
    ">

      This enquiry was submitted via  
      <strong>Chhaya Party Plot Website</strong>

    </div>

  </div>

</div>
`;

    await transporter.sendMail({
      from: `"Chhaya Party Plot" <${process.env.EMAIL_USER}>`,

      to: process.env.EMAIL_USER,

      subject: `New Enquiry - ${data.eventType} on ${formatDate(new Date(data.startingDate))}`,

      html,
    });
  } catch (error) {
    console.error("Email send error:", error);
  }
}
