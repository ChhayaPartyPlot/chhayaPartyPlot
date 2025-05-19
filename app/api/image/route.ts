import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/app/lib/cloudinary';
import { CloudinaryUploadResult } from '@/app/util/interfaces/cludinaryObj';
import {Gallery} from '@/app/models/Gallary';
import { connectToDatabase } from '@/app/lib/mongodb';


// Helper to convert Node stream to Buffer
const addImageToDb = async (url : string) : Promise<NextResponse> => {
  try {
    await connectToDatabase();
    const newImage = new Gallery({ url});
    await newImage.save();
    return NextResponse.json({ message: 'Image added to database successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error adding image to database:', error);
    return NextResponse.json({ error: 'Failed to add image to database' }, { status: 500 });
  }

}


export async function GET(req: NextRequest) {

  try {
    await connectToDatabase();

    let images;
   
    images = await Gallery.find();

    return NextResponse.json(images, { status: 200 });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}



export async function POST(req: NextRequest) {
  const contentType = req.headers.get('content-type') || '';
  if (!contentType.includes('multipart/form-data')) {
    return NextResponse.json({ error: 'Unsupported content type' }, { status: 400 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }


    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result: CloudinaryUploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: 'uploads' }, (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error('No result returned from Cloudinary'));
        resolve(result as unknown as CloudinaryUploadResult);
      });

      stream.end(buffer);
    });

    // Add image and eventType to DB
    return await addImageToDb(result.secure_url);
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}