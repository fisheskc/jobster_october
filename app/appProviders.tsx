"use client";

// ClerkProvider gives authentication context (user, session, etc.) to the whole app.
// import { ClerkProvider } from "@clerk/nextjs";
// Wraps the app in your Redux store so all components can access global state.
// import { ReduxProviderWrapper } from "@/components/ReduxProviderWrapper";
// Provides theme context (dark/light mode) for the entire app.
import { ThemeProvider } from "@/components/theme-providers";
// Custom provider wrapper (often React Query, context providers, etc.)
import Providers from "./providers";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
        <ThemeProvider attribute="class" defaultTheme="system">
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
  );
}
