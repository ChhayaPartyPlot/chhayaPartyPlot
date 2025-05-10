import { User } from "@/app/models/User";
import { NextResponse } from "next/server";

export async function getUserThroughEmail(email: string): Promise<NextResponse> {
    if (!email) {
        const user = await User.findOne();
        if (!user) {
            return NextResponse.json({ message: 'User Not Found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'User Found', user }, { status: 200 });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json({ message: 'User Not Found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'User Found', user }, { status: 200 });
}