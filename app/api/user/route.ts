import { NextRequest, NextResponse } from 'next/server';
import {connectToDatabase} from '@/lib/mongodb';
import { User } from '@/models/User'; // Adjust the path to your actual User model

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;
const MOB_NUMBER_PATTERN = /^[0-9]{10}$/;

async function getUserThroughMobNumber(mobNumber: Number): Promise<NextResponse> {
    const user = await User.findOne({ mobNumber: mobNumber });
    if (!user) {
        return NextResponse.json('User Not Found',{ status: 404 });
    }
    return NextResponse.json('User Found',{ status: 200 });
}

async function getUserThroughEmail(email: string): Promise<NextResponse> {
    const user = await User.findOne({ email: email });
    if (!user) {
        return NextResponse.json('User Not Found',{ status: 404 });
    }
    return NextResponse.json('User Found',{ status: 200 });
}

export async function GET(req: NextRequest) {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);

    const mobNumber = Number(searchParams.get('mobNumber'));
    const email = searchParams.get('email');

    if (mobNumber && MOB_NUMBER_PATTERN.test(mobNumber.toString())) {
        let res = await getUserThroughMobNumber(mobNumber);
        return res;
    } else if (email && EMAIL_PATTERN.test(email)) {
        let res = await getUserThroughEmail(email);
        return res;
    } else {
        return NextResponse.json({ message: 'No parameters provided' }, { status: 400 });
    }

}

export async function POST(req: NextRequest) {
    await connectToDatabase();

    const { name, mobNumber, email } = await req.json();
    const user = new User({ name, mobNumber, email });

    try {
        await user.save();
        return NextResponse.json('User Created', { status: 201 });
    } catch (error) {
        return NextResponse.json('User Not Created', { status: 500 });
    }
    
}
