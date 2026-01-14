import { usersCollection, verifyAuthToken } from "@/lib/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
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

        const data = await request.json();
        if(!data || !data.uid || !data.user) {
            return NextResponse.json({ message: "Invalid request data." }, { status: 400 });
        }
        usersCollection.doc(data.uid).set({
            ...data.user,
            createdAt: new Date().toISOString(),
        });

        return NextResponse.json({ message: "User registered successfully." }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Invalid request data." }, { status: 400 });
    }
}