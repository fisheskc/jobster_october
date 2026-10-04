import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("PATCH clerkId:", JSON.stringify(userId));

    const data = await req.json();

    const updatedUser = await prisma.registration.update({
      where: { clerkId: userId },
      data: {
        firstName: data.name,
        lastName: data.lastName,
        email: data.email,
        // location: data.location,
        location: ""
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("PATCH /api/user error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
