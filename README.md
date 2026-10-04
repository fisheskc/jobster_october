# jobster_october
My Next JS project uses: prisma, supabase, and clerk for authentification. To run it, type this into your terminal: npm run dev To build the project, type this into your terminal: npm run buildMy Next.js Jobster project has App Router rules: -Server Components can import Server Components -Client Components can import Client Components -Server Components cannot import Client Components -Client Components cannot live inside server-only folders

Route Handlers — My app/api//route.ts files They are the App Router replacement for pages/api/. We export HTTP verbs: ts
My project cannot have: A client layout import Prisma A client layout import ANYTHING that indirectly imports Prisma

exportasyncfunctionGET(req: Request) { ... } exportasyncfunctionPOST(req: Request) { ... } Use them when: · we need a real API endpoint · we want to expose data to external clients · we are integrating webhooks (Stripe, Clerk, Supabase, etc.) · we want React Query to call your backend via fetch() · we want full control over HTTP responses This is what I have been using for my Prisma + Clerk API routes.

Server Actions — Internal server functions These are not API routes. They are server-only functions that my React components can call directly. ts
"use server"; export sync function createProduct(data) { await prisma.product.create({ data }); } Use them when: · we want to mutate data directly from UI · we don’t need an HTTP endpoint · we want automatic form handling · we want zero client bundle overhead They are great for admin dashboards, but not for external APIs.

Server Components — The default in App Router Every .tsx file in app/** is a Server Component unless marked "use client". They: · Fetch data on the server · Render HTML on the server · Never ship Prisma or secrets to the browser · Are perfect for loading data with await prisma.* directly in the component This is why my Prisma must stay out of client components.
When to use which for my Next.js + Prisma + Clerk + React Query setup: ✔ Use Route Handlers when: · React Query needs to call an API · we need CRUD endpoints · Ywe want Node.js runtime (your current goal) · we want to keep Prisma out of client components · we need authentication middleware (Clerk) · we want external access (mobile app, webhook) ✔ Use Server Actions when: · we want to mutate data directly from UI · we don’t need an API endpoint · we want simpler code (no fetch, no JSON parsing) · we want zero client bundle size increase ✔ Use Server Components when: · we want to fetch data on the server · we want to render UI with Prisma queries · we want fast SSR without client JS

The official Clerk rule (from Clerk docs) Do NOT match /api/* routes in middleware. Prisma and server‑only modules will break.

If you are matching /api/* in your middleware.ts file, prisma break.

Prisma · install prisma vs-code extension

Prisma ORM is a database toolkit that simplifies database access in web applications. It allows developers to interact with databases using a type-safe and auto-generated API, making database operations easier and more secure. · Prisma server: A standalone infrastructure component sitting on top of your database. · Prisma client: An auto-generated library that connects to the Prisma server and lets you read, write and stream data in your database. It is used for data access in your applications. npm install prisma --save-dev npm install @prisma/client

npx prisma init

npx prisma migrate dev --name init creates a new migration for your database schema changes and applies it, while npx prisma db push directly updates the database schema without creating a migration. In the context of databases, a migration is set of operations, that modify the database schema, helping it evolve over time while preserving existing data. npx prisma db push

npx prisma studio

The prisma generate command creates type-safe database clients and other artifacts (like Zod schemas) based on the generator and data model blocks defined in your schema.prisma file.

Core Configuration To use the command, your schema must define at least one generator block, typically for the prisma-client:

generator client { provider = "prisma-client" output = "./generated" // Required for the new prisma-client generator }

Supabase is my database software. Supabase is an open-source backend-as-a-service platform that provides developers with a dedicated PostgreSQL database as its core infrastructure. Unlike proprietary NoSQL solutions, it leverages the full power of PostgreSQL, offering relational data modeling, SQL queries, and enterprise-grade features like ACID compliance and Row Level Security.

The platform simplifies backend development by wrapping the database with several integrated services:

Auto-generated APIs: Instantly creates REST and GraphQL endpoints from the database schema.
Authentication: Built-in user management with support for email, magic links, OAuth providers, and multi-factor authentication.
Real-time Subscriptions: Enables live data synchronization across clients using WebSockets.
Storage: S3-compatible file storage for images, videos, and documents with security policies.
Edge Functions: Serverless functions for running custom logic closer to users.
Put this in your .env file for supabase Publishable key This key is safe to use in a browser if you have enabled Row Level Security (RLS) for your tables and configured policies.

SUPABASE_URL=https://aubvbrlscmmlygjlapzn.supabase.coSUPABASE_KEY=sb_secret__vhSGdXXX XXXXXSecret keys

These API keys allow privileged access to your project's APIs. Use in servers, functions, workers or other backend components of your application.

sb_secret__vhSGdXXXX XXXXX


