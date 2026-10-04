// "use client"
// app/layout.tsx
// Import global CSS that applies to the entire application.
// This file is loaded once and affects all routes.
import "./global.css";
// Load the Inter font using Next.js' built‑in font optimization.
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ReduxProvider from "@/app/providers/ReduxProvider";
import AppProviders from "./appProviders";
// Global navigation bar shown on every page.
import RootNavbar from "@/components/RootNavbar";
import SmallSidebar from "@/components/SmallSidebar";
import Container from '@/components/global/container';

// Load the Inter font subset.
const inter = Inter({ subsets: ["latin"] });

// Toaster is imported but not rendered — if you want global toast notifications,
// you must place <Toaster /> inside the layout.
import { Toaster } from "@/components/ui/toaster";
import { type ClassValue } from 'clsx';
// Root Layout: wraps every page in the app.
// This is the top‑level structure for your entire Next.js App Router project.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
            {/* Cloudflare Turnstile script */}
            <script
              src="https://challenges.cloudflare.com/turnstile/v0/api.js"
              async
              defer
            ></script>
          </head>
          <body className={inter.className}>
            <ReduxProvider>
              <AppProviders>
               <RootNavbar />
               <SmallSidebar /> 
              <Container className='py-20'>
                 {children}
              </Container>
            </AppProviders>
            </ReduxProvider>
          </body>
        </html>
    </ClerkProvider>
  );
}

