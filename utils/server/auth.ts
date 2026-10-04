import "server-only";
// This ensures the file is *never* bundled into the client.
// It can only run on the server, which is required because:
// - Clerk's server-side auth() must run in a server environment
// - redirect() is a server-only function
// - You may access secure environment variables here

import { auth } from "@clerk/nextjs/server";
// Server-side Clerk authentication helper.
// Returns the authenticated user or null if unauthenticated.

import { redirect } from "next/navigation";
// Server-side redirect function used in App Router.
// Can only be called in server components or server functions.

/**
 * authenticateAndRedirect()
 * -------------------------
 * Used in server components or server-side logic where:
 * - You MUST ensure the user is authenticated
 * - You want to redirect unauthenticated users to a safe page ("/")
 *
 * Returns:
 *   - userId (string) if authenticated
 *   - triggers a redirect("/") if not authenticated
 */
export async function authenticateAndRedirect(): Promise<string> {
  // Get the authenticated user from Clerk
  const { userId } = await auth();

  // If no user is logged in, redirect them to the homepage
  if (!userId) redirect("/");

  // Return the authenticated user's ID
  return userId;
}

/**
 * authenticateForApi()
 * --------------------
 * Used inside API routes where:
 * - You want to check authentication
 * - But you DO NOT want to redirect
 * - Instead, you return null for unauthenticated requests
 *
 * Returns:
 *   - userId (string) if authenticated
 *   - null if not authenticated
 */
export async function authenticateForApi(): Promise<string | null> {
  const { userId } = await auth();

  // Return userId or null (no redirect)
  return userId ?? null;
}
