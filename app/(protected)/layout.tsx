"use client";

import AuthGuard from "@/lib/auth/auth-guard";
import { useAuth } from "@/lib/hooks/use-auth";
import Link from "next/link";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();

  return (
    <AuthGuard>
      <div className="min-h-screen bg-neutral-50">
        <header className="border-b border-neutral-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-6">
              <Link className="text-sm font-semibold" href="/dashboard">
                Louella Bakery
              </Link>
              <nav className="hidden gap-4 text-sm text-neutral-500 md:flex">
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/files">Files</Link>
                <Link href="/jobs/overview">Jobs</Link>
              </nav>
            </div>
            <button
              className="rounded-full border border-neutral-200 px-4 py-2 text-sm"
              onClick={logout}
              type="button"
            >
              Logout
            </button>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
      </div>
    </AuthGuard>
  );
}
