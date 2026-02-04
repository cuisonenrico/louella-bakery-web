"use client";

import { useQuery } from "@tanstack/react-query";
import { listFiles } from "@/lib/api/files";

export default function FilesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["files"],
    queryFn: listFiles,
  });

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">Files</h1>
        <p className="text-sm text-neutral-500">
          Uploads are handled through signed URLs.
        </p>
      </div>
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        {isLoading ? (
          <p className="text-sm text-neutral-500">Loading files...</p>
        ) : (
          <ul className="space-y-2 text-sm text-neutral-700">
            {data?.map((file) => (
              <li key={file.id} className="flex items-center justify-between">
                <span>{file.name}</span>
                <span className="text-xs text-neutral-500">
                  {file.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
