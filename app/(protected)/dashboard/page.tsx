"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/api/auth";

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getCurrentUser,
  });

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">Dashboard</h1>
        <p className="text-sm text-neutral-500">
          Overview of your account and recent activity.
        </p>
      </div>
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        {isLoading ? (
          <p className="text-sm text-neutral-500">Loading profile...</p>
        ) : (
          <div className="space-y-1 text-sm text-neutral-700">
            <p>
              <span className="font-medium">Name:</span> {data?.name ?? "—"}
            </p>
            <p>
              <span className="font-medium">Email:</span> {data?.email ?? "—"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
