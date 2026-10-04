"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function DashboardAuthWrapper({ children }: { children: React.ReactNode }) {
const { user, isLoaded } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoaded) return;

    // ⭐ Allow registration page even when user is null
    if (pathname === "/register") return;

    // ⭐ Only protect admin pages
    if (!user && pathname.startsWith("/admin")) {
      router.push("/sign-in");
    }

   }, [isLoaded, user, router, pathname]);

  if (!isLoaded) return null;

  return <>{children}</>;
}
