import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user already exists
    const existing = await prisma.registration.findUnique({
      where: { clerkId: userId },
    });

    if (existing) {
      return NextResponse.json({ ok: true, created: false });
    }

    // Create new row
    const newUser = await prisma.registration.create({
      data: {
        clerkId: userId,
        firstName: "",
        lastName: "",
        email: "",
        location: "",
        password: "",
      },
    });

    return NextResponse.json({ ok: true, created: true, user: newUser });
  } catch (error) {
    console.error("INIT /api/user/init error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
