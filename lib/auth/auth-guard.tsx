"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/use-auth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, refresh, isLoading } = useAuth();
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let active = true;

    const run = async () => {
      if (!isAuthenticated) {
        try {
          await refresh();
        } catch {
          router.replace("/login");
        }
      }

      if (active) {
        setChecking(false);
      }
    };

    run();

    return () => {
      active = false;
    };
  }, [isAuthenticated, refresh, router]);

  if (checking || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-neutral-500">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
