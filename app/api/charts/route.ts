export const runtime = "nodejs";

import { NextResponse } from "next/server";
// import { getChartsDataAction } from "@/utils/actions";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import dayjs from "dayjs";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sixMonthsAgo = dayjs().subtract(6, "month").toDate();

  const jobs = await prisma.job.findMany({
    where: { clerkId: userId, createdAt: { gte: sixMonthsAgo } },
    orderBy: { createdAt: "asc" },
  });

  const chart = jobs.reduce((acc, job) => {
    const date = dayjs(job.createdAt).format("MMM YY");
    const existing = acc.find((e) => e.date === date);

    if (existing) existing.count++;
    else acc.push({ date, count: 1 });

    return acc;
  }, [] as Array<{ date: string; count: number }>);

  return NextResponse.json(chart);
}

