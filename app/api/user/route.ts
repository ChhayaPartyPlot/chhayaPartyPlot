import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import { User } from '@/app/models/User';
import { getUserThroughMobNumber } from '@/app/util/functions/getUserThroughMobNumber';
import { getUserThroughEmail } from '@/app/util/functions/getUserThroughEmail';

// const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;
const MOB_NUMBER_PATTERN = /^[0-9]{10}$/;

export async function GET(req: NextRequest) {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const mobNumber = Number(searchParams.get('mobNumber'));
    // let email = searchParams.get('email');

    // if (!mobNumber && !email) {
    //     email = '';
    // }

    if (mobNumber && MOB_NUMBER_PATTERN.test(mobNumber.toString())) {
        return await getUserThroughMobNumber(mobNumber);
    // } else if ((email && EMAIL_PATTERN.test(email)) || email === '') {
    //     return await getUserThroughEmail(email);
    } else {
        return NextResponse.json({ message: 'Invalid or missing parameters' }, { status: 400 });
    }
}

export async function POST(req: NextRequest) {
    await connectToDatabase();

    try {
        const { name, mobNumber, altNumber } = await req.json();
        console.log(name, mobNumber, altNumber);
        const user = new User({ name, mobNumber, altNumber });
        await user.save();
        console.log(user);

        return NextResponse.json({ message: 'User Created', user }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'User Not Created', error }, { status: 500 });
    }
}
