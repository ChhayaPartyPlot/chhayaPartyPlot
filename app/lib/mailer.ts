import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.in',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

