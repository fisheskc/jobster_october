// Force this route to always run dynamically.
// This disables static optimization and ensures fresh data on every request.
export const dynamic = "force-dynamic";

// Force the route to run in the Node.js runtime.
// Prisma does NOT support the Edge runtime, so this is required.
export const runtime = "nodejs";

// Allow Vercel to choose the best region automatically.
// Useful when your database is hosted in a specific region.
export const preferredRegion = "auto";

import { NextResponse } from "next/server";
// Used to send JSON responses in App Router API routes.

import prisma from "@/lib/prisma";
// Your Prisma client (singleton) used to query the database.

import { auth } from "@clerk/nextjs/server";
// Server-side Clerk authentication helper.

import { Prisma } from "@prisma/client";
// Needed for QueryMode.insensitive (case-insensitive search).

/**
 * GET /api/jobs
 * -------------
 * Lists jobs for the authenticated user.
 * Supports:
 * - search filtering
 * - status filtering
 * - pagination
 */
export async function GET(req: Request) {
  // Authenticate the user via Clerk
  const { userId } = await auth();

  // Reject unauthenticated requests
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Extract query parameters from the URL
  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search") || "";
  const jobStatus = searchParams.get("jobStatus") || "all";
  const page = Number(searchParams.get("page") || 1);
  const limit = 10; // Pagination size

  // Build Prisma "where" filter dynamically
  const where = {
    clerkId: userId, // Only fetch jobs belonging to the authenticated user

    // If search is provided, filter by position (case-insensitive)
    ...(search
    ? {
      OR: [
        {
          position: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        },
        {
          company: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        },
      ],
    }
  : {}),

    // If jobStatus is not "all", filter by status
    ...(jobStatus !== "all" ? { status: jobStatus } : {}),
  };

  // Run both queries in parallel:
  // - findMany: fetch paginated jobs
  // - count: total number of matching jobs
  const [jobs, count] = await Promise.all([
    prisma.job.findMany({
      where,
      orderBy: { createdAt: "desc" }, // newest first
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.job.count({ where }),
  ]);

  // Return paginated results
  return NextResponse.json({
    jobs,
    count,
    page,
    totalPages: Math.ceil(count / limit),
  });
}

/**
 * POST /api/jobs
 * --------------
 * Creates a new job record for the authenticated user.
 */
export async function POST(req: Request) {
  // Authenticate the user
  const { userId } = await auth();

  // Reject unauthenticated requests
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse JSON body
  const body = await req.json();

  try {
    // Create a new job record in the database
    const job = await prisma.job.create({
      data: {
        position: body.position,
        company: body.company,
        location: body.location,
        status: body.status,
        mode: body.mode,
        clerkId: userId, // attach user ID
      },
    });

    // Return the created job
    return NextResponse.json(job);
  } catch (err: any) {
    // Handle validation or database errors
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
