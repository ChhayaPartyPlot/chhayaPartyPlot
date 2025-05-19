import { User } from "@/app/models/User";
import { NextResponse } from "next/server";

export async function getUserThroughMobNumber(mobNumber: number): Promise<NextResponse> {
    const user = await User.findOne({
        $or: [
            { mobNumber: mobNumber },
            { altNumber: mobNumber }
        ]
    });
    if (!user) {
        return NextResponse.json({ message: 'User Not Found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'User Found', user }, { status: 200 });
}
