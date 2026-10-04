"use client";

// import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
// import { useEffect, useState } from "react";

import ButtonContainer from "./ButtonContainer";
import JobCard from "./JobCard";

export default function JobsList({ userId }: { userId: string }) {
  // const { user, isLoaded } = useUser();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const jobStatus = searchParams.get("jobStatus") || "all";
  const page = Number(searchParams.get("page")) || 1;

  // const [data, setData] = useState<any>(null);
  // const [loading, setLoading] = useState(true);

  const { data, isLoading, error } = useQuery({
     queryKey: ["all-jobs", search, jobStatus, page, userId],
      queryFn: async () => {
      const res = await fetch(
        `/api/jobs?search=${search}&jobStatus=${jobStatus}&page=${page}&userId=${userId}`,
        { cache: "no-store" }
      );
      
      // useEffect(() => {
      //   if (!userId) return;

      //   const loadJobs = async () => {
      //     setLoading(true);

      //     const res = await fetch(
      //   `/api/jobs?search=${search}&jobStatus=${jobStatus}&page=${page}&userId=${userId}`,
      //   { cache: "no-store" }
      // );


    //   if (!res.ok) {
    //   console.error("Failed to load jobs:", await res.text());
    //   setData({ jobs: [], count: 0, totalPages: 1 });
    //   setLoading(false);
    //   return;
    // }

    if (!res.ok) {
        throw new Error("Failed to load jobs");
    }
    return res.json();
    },
  });

  //     const json = await res.json();
  //     setData(json);
  //     setLoading(false);
  //   };

  //   loadJobs();
  // }, [search, jobStatus, page, userId]);



   // API still loading
  if (isLoading) return <h2 className="text-xl">Loading jobs…</h2>;

  // User not signed in
  if (!userId) return <h2 className="text-xl">Please sign in to view your jobs.</h2>;

  if (error) return <h2 className="text-xl">Error loading jobs</h2>;

  const { jobs, count, totalPages } = data;

  if (!jobs || jobs.length === 0) {
    return <h2 className="text-xl">No jobs found.</h2>;
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold">{count} jobs found</h2>

        {totalPages > 1 && (
          <ButtonContainer currentPage={page} totalPages={totalPages} />
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {jobs.map((job: any) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  );
}
