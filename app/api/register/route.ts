// app/api/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {connectToDatabase} from '@/app/lib/mongodb';
import { AdminModel } from '@/app/models/Admin';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const { username, password } = await req.json();

  const existingUser = await AdminModel.findOne({ username });
  if (existingUser) {
    return NextResponse.json({ message: 'Username already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await AdminModel.create({ username, password: hashedPassword });

  return NextResponse.json({
    message: 'User registered successfully',
    user: {
      id: newUser._id,
      username: newUser.username,
    },
  });
}
