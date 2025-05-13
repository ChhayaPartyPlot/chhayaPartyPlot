import fs from 'fs';
import path from 'path';

const dataFilePath = path.resolve(process.cwd(), 'contactData.json');

interface InquiryData {
    name:String, phone:String, startingDate:String , totalBookingDays?:Number
}

export function saveContactSubmission(data: InquiryData) {
  let existing: InquiryData[] = [];
  if (fs.existsSync(dataFilePath)) {
    existing = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
  }

  existing.push(data);
  fs.writeFileSync(dataFilePath, JSON.stringify(existing, null, 2));
}

export function getAndClearSubmissions() {
  if (!fs.existsSync(dataFilePath)) return [];

  const data : InquiryData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
  fs.writeFileSync(dataFilePath, '[]');
  return data;
}
