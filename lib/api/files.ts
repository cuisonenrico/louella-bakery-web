import { apiFetch } from "./client";

export type FileItem = {
  id: string;
  name: string;
  status: string;
};

export type PresignResponse = {
  uploadUrl: string;
  fileId: string;
};

export async function listFiles(): Promise<FileItem[]> {
  return apiFetch<FileItem[]>("/api/v1/files");
}

export async function requestPresignedUrl(payload: {
  filename: string;
  contentType: string;
}) {
  return apiFetch<PresignResponse>("/api/v1/files/presign", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export async function completeUpload(payload: { fileId: string }) {
  return apiFetch("/api/v1/files/complete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}
