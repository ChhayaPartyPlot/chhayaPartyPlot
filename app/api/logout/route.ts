import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const sessionToken = req.cookies.get('session_token')?.value;

  console.log(req.cookies.get('session_token'));

  if (!sessionToken) {
    return NextResponse.json(
      { message: 'No active session to logout' },
      { status: 400 }
    );
  }

  const response = NextResponse.json({ message: 'Logged out successfully' });

  response.cookies.set('session_token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });

  return response;
}

export async function GET() {
  return NextResponse.json({ message: 'Send POST request to logout' });
}
