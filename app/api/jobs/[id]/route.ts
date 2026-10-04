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

// import { Prisma } from "@prisma/client";
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
export async function GET(req: Request, { params }: { params: { id: string } }) {
  // Authenticate the user via Clerk
  const { userId } = await auth();

  // Reject unauthenticated requests
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Extract query parameters from the URL
  // const { searchParams } = new URL(req.url);
  // const search = searchParams.get("search") || "";
  // const jobStatus = searchParams.get("jobStatus") || "all";
  // const page = Number(searchParams.get("page") || 1);
  // const limit = 10; // Pagination size

  const job = await prisma.job.findUnique({
    where: { id: params.id, clerkId: userId },
  });

  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }
  return NextResponse.json(job);
}

/**
 * PATCH /api/jobs/[id]
 * Update a single job
 */

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  const updatedJob = await prisma.job.update({
    where: { id: params.id, clerkId: userId },
    data,
  });

  return NextResponse.json(updatedJob);
}

/**
 * DELETE /api/jobs/[id]
 * Delete a single job
 */

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.job.deleteMany({
    where: { id: params.id, clerkId: userId },
  });

  return NextResponse.json({ message: "Job deleted" });
}







