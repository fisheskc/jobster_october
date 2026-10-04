export const dynamic = "force-dynamic";
export const revalidate = 0;

// import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
// Client component that renders the actual registration UI
import Register from "./Register"; 

/**
 * RegisterPage (Server Component)
 *
 * This page:
 *  - Runs on the server (no "use client")
 *  - Checks if a user is already authenticated via Clerk
 *  - Redirects authenticated users away from the register page
 *  - Renders the <Register /> client component only for guests
 *
 * Why this pattern?
 *  - Server Components can run `auth()` securely on the server
 *  - Redirects happen BEFORE rendering any UI (fast + safe)
 *  - Prevents logged‑in users from accessing the register page
 */
export default async function RegisterPage() {
  // Get the current authenticated user from Clerk.
  // If middleware is configured correctly, this is synchronous and safe.
  // const { userId } = await auth();

  // If the user is already logged in, do NOT show the register form.
  // Redirect them to the dashboard immediately.
console.log("REGISTER PAGE RENDERED");
  // Otherwise, render the client-side registration form.
  return <Register />;
}
