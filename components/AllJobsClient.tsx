"use client";


// import JobsList from "@/components/JobsList";import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { HydrationBoundary, DehydratedState } from '@tanstack/react-query';
import SearchForm from './SearchForm';
import JobsList from './JobsList';
import { useUser } from "@clerk/nextjs";

// import { JobType } from '@/utils/types';

// type AllJobsClientProps = {
//   dehydrated: DehydratedState;
// };

// export default function AllJobsClient({ dehydrated }: AllJobsClientProps) {
export default function AllJobsClient() {

  const { user, isLoaded } = useUser();

  // Clerk still loading
  if (!isLoaded) {
    return <p className="text-xl">Loading...</p>;
  }

   // User not signed in
  if (!user) {
    return <p className="text-xl">Please sign in to view your jobs.</p>;
  }

  return (
      <>
      <SearchForm />
        <JobsList userId={user.id} />
      </>
  );
}