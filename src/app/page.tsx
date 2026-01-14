"use client"
import { Hero3D } from "@/components/sections/Hero3D"
import { useApp } from "@/context/AppContext";
import { onUserSignedIn } from "@/lib/firebaseClient";
import { useEffect } from "react"

export default function HomePage() {
    const { mountUser } = useApp();
    onUserSignedIn(() => {
        mountUser();
    });
    return (
        <main className="min-h-screen bg-black text-white">
            <Hero3D />
        </main>
    )
}
