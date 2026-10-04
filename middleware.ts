import { clerkMiddleware } from "@clerk/nextjs/server";
// import { clerkMiddleware } from "@clerk/nextjs/server";
// Import Clerk's official middleware for Next.js App Router.
// This middleware handles authentication, session validation,
// and injects Clerk's auth state into server-side requests.

export default clerkMiddleware() 
  // Middleware handler
  


// function isPublicRoute(req: any) {
//   const publicRoutes = ["/", "/login", "/register", "/api/createRegistration"];
//   return publicRoutes.includes(req.nextUrl.pathname);
// }
// Export the middleware as the default handler.
// This runs BEFORE every matched request and ensures Clerk is active.
export const config = {
  matcher: [
    // Apply Clerk ONLY to non-API routes
    "/(admin)(.*)",   // protect admin routes
    "/(api)(.*)",     // ensure auth() works in API routes
  ],
};







