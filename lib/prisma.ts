import "server-only";
// Ensures this file is *never* bundled into the client.
// Prisma MUST run only on the server because:
// - It depends on Node.js APIs
// - It cannot run in React Server Components or the Edge runtime
// - It should never leak database credentials to the browser

import { PrismaClient } from "@prisma/client";
// Import the PrismaClient class used to interact with your database.

// A small helper function that creates a new PrismaClient instance.
// Wrapped in a function so TypeScript can infer its return type.
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Extend the Node.js global type so we can store the Prisma instance.
// This prevents TypeScript errors when accessing global.prisma.
declare global {
  var prisma: ReturnType<typeof prismaClientSingleton> | undefined;
}

// Create a Prisma client instance.
// If global.prisma already exists (in development), reuse it.
// Otherwise, create a new instance.
const prisma = global.prisma ?? prismaClientSingleton();

// In development, Next.js hot-reloads frequently.
// Without this check, Prisma would create MANY clients and crash the DB.
// Storing the client on global.prisma ensures only ONE instance is used.
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// Export the Prisma client so the rest of your app can use it.
export default prisma;




