import { apiFetch } from "./client";

export type Job = {
  id: string;
  status: string;
  progress: number;
};

export async function listJobs(): Promise<Job[]> {
  return apiFetch<Job[]>("/api/v1/jobs");
}

export async function getJobById(id: string): Promise<Job> {
  return apiFetch<Job>(`/api/v1/jobs/${id}`);
}
