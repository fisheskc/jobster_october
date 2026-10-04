export const runtime = "nodejs";

import { NextResponse } from "next/server";
// import { getStatsAction } from "@/utils/actions";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Fetch all jobs for this user
 const jobs = await prisma.job.findMany({
    where: { clerkId: userId },
    select: { status: true },
  });
// Normalize and count
  const result = { pending: 0, interview: 0, declined: 0 };

  for (const job of jobs) {
    const status = job.status?.toLowerCase().trim();

    if (status === "pending") result.pending++;
    if (status === "interview") result.interview++;
    if (status === "declined") result.declined++;
  }

  return NextResponse.json(result);
}
