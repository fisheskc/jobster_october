export const dynamic = "force-dynamic";
export const revalidate = 0;

import EditJobForm from "@/components/EditJobForm";

/**
 * Dynamic Route Page Component
 *
 * This file represents the page for:
 *    /admin/all-jobs/[id]
 *
 * It is a **Server Component** (because it does NOT use `"use client"`).
 *
 * Responsibilities:
 *  - Receive the dynamic route parameter (`id`)
 *  - Pass that ID down to the EditJobForm client component
 *  - Let the client component handle fetching + editing logic
 *
 * Why this pattern?
 *  - Server Components are ideal for routing and data loading boundaries
 *  - Client Components handle interactivity (forms, inputs, React Query, etc.)
 */
export default async function Page({ params }: { params: { id: string } }) {
  // Pass the jobId to the client component.
  // No data fetching happens here — EditJobForm handles that.
  return <EditJobForm jobId={params.id} />;
}
