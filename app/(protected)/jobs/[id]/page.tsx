"use client";

import { useQuery } from "@tanstack/react-query";
import { getJobById } from "@/lib/api/jobs";

export default function JobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["jobs", params.id],
    queryFn: () => getJobById(params.id),
    refetchInterval: 5000,
  });

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">
          Job {params.id}
        </h1>
        <p className="text-sm text-neutral-500">Polling job status.</p>
      </div>
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        {isLoading ? (
          <p className="text-sm text-neutral-500">Loading job...</p>
        ) : (
          <div className="space-y-2 text-sm text-neutral-700">
            <p>
              <span className="font-medium">Status:</span> {data?.status}
            </p>
            <p>
              <span className="font-medium">Progress:</span> {data?.progress}%
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
