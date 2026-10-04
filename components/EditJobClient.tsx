"use client";

import EditJobForm from "@/components/EditJobForm";

export default function EditJobClient({ jobId }: { jobId: string }) {
  return <EditJobForm jobId={jobId} />;
}