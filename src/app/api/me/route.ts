import { usersCollection, verifyAuthToken } from "@/lib/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('Authorization') || '';
        if (!authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
        }
        const token = authHeader.split(' ')[1];
        const verified = await verifyAuthToken(token);
        if (!verified) {
            return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
        }

        const user = usersCollection.doc(verified.uid);
        const userDoc = await user.get();
        if (!userDoc.exists) {
            return NextResponse.json({ message: "User not found." }, { status: 404 });
        }

        return NextResponse.json({ user: userDoc.data() }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }
}