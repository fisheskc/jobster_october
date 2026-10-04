'use server';
// Force this route to run in the Node.js runtime instead of the default Edge runtime.
// This is important because Prisma does NOT support the Edge runtime.
// Simple debug log to confirm the route file is being executed.
import { NextResponse } from "next/server"; 
import prisma from "@/lib/prisma";
// Your Prisma client instance.
import { createAndEditRegSchema } from "@/utils/types"; // Zod schema for validating registration input.
      // Server-side Clerk authentication helper.

// POST /api/register
// Handles creating a new registration record in the database.
export async function POST(req: Request) {
  // Debug log to confirm POST handler is reached.

  // Authenticate the request using Clerk.
  // auth() returns the authenticated user or null if unauthenticated.
  // const { userId } = await auth();


  // Reject requests where the user is not logged in.
  // if (!userId) {
  //   return NextResponse.json(
  //     { success: false, error: "Unauthorized" },
  //     { status: 401 }
  //   );
  // }

  // Parse the incoming JSON body from the request.
  // const body = await req.json();
 
  try {
    // Validate the incoming data using your Zod schema.
    // This ensures the shape and types of the request body are correct.
    // const data = createAndEditRegSchema.parse(body);
   // Parse JSON body
    const body = await req.json();
    // console.log("RAW DATA RECEIVED:", json);

    // Create a new registration record in the database using Prisma.
    // const register = await prisma.registration.create({
    //   data: {
    //     ...data,          // Spread validated fields from the request body.
    //     clerkId: userId,  // Attach Clerk user ID to the record.
    //     createdAt: new Date(), // Explicit timestamps.
    //     updatedAt: new Date(),    
    //   },
    // });
     // ⭐ ADD THIS LINE RIGHT HERE ⭐
    // 2 Validate with Zod (must include clerkId)
    // const data = createAndEditRegSchema.parse(json);
    // console.log("ZOD VALIDATED DATA:", data);
    // Clerk built-in <SignUp /> provides these fields:
    // const { clerkId, firstName, lastName, email, password } = data;

     // ⭐ Validate with Zod
    const parsed = createAndEditRegSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: "Invalid input" }, { status: 400 });
    }
    // const data = parsed.data;

    // 3️Insert into Prisma
    // const registration = await prisma.registration.create({
    //   data: {
    //     clerkId: data.clerkId,
    //     firstName: data.firstName,
    //     lastName: data.lastName,
    //     email: data.email,
    //     password: data.password,
    //   },
    // });
    const registration = await prisma.registration.create({
      data: parsed.data,
    });


    // Return success response with the created record.
    // console.log("PRISMA INSERT SUCCESS", registration);

  return NextResponse.json({ success: true, register: registration });
  } catch (err: any) {
    console.error("PRISMA ERROR:", err);
  return NextResponse.json(
  {
        success: false,
        error: "REGISTRATION_FAILED",
        details: err.message ?? String(err),
      },
      { status: 500 }
    );
  }
}

