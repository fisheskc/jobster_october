"use client"; 
// This marks the file as a Client Component.
// Required because React Query, useState, and Devtools all rely on client-side execution.

// React state is used to create and store the QueryClient instance.
import { useState } from "react";

// React Query core client + provider for global caching and data fetching.
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Devtools panel for inspecting queries, cache, and React Query behaviour.
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Global toast notifications (UI component).
import { Toaster } from "@/components/ui/toaster";

// This component wraps the entire app with React Query providers.
// It is used inside app/layout.tsx to give every route access to React Query.
export default function Providers({ children }: { children: React.ReactNode }) {

  // Create a single QueryClient instance and store it in React state.
  // useState ensures the client is created only once per session,
  // preventing React Query from resetting cache on every render.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Data stays "fresh" for 5 minutes (300,000 ms).
            // Prevents unnecessary refetching and improves performance.
            staleTime: 60 * 1000 * 5,
          },
        },
      })
  );

  return (
    // Provide the QueryClient to the entire React tree.
    <QueryClientProvider client={queryClient}>
      
      {/* Render all children (your app's pages and components). */}
      {children}

      {/* Global toast notifications — available anywhere in the app. */}
      <Toaster />

      {/* React Query Devtools — useful for debugging cache, queries, and mutations. */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

