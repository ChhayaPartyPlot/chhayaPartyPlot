// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {connectToDatabase} from '@/app/lib/mongodb';
import { AdminModel } from '@/app/models/Admin';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const { username, password } = await req.json();

  const user = await AdminModel.findOne({ username });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
  }

  // Create response with cookie set for "session"
  const response = NextResponse.json({
    message: 'Login successful',
    user: {
      id: user._id,
      username: user.username,
    },
  });

  // For demo, just set a dummy token; replace with real JWT or session id in prod
  response.cookies.set('session_token', 'valid-session-token', {
    httpOnly: false,
    path: '/',
    maxAge: 60 * 60 * 1, // 1 hr
  });

  console.log(response.cookies);

  return response;
}
