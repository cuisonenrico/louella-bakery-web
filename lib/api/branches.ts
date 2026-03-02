import { apiFetch } from "./client";
import type { Branch, CreateBranchDto, UpdateBranchDto } from "@/lib/types/branches";

export async function getBranches(): Promise<Branch[]> {
  return apiFetch<Branch[]>("/api/v1/branches");
}

export async function getBranchById(id: number): Promise<Branch> {
  return apiFetch<Branch>(`/api/v1/branches/${id}`);
}

export async function createBranch(data: CreateBranchDto): Promise<Branch> {
  return apiFetch<Branch>("/api/v1/branches", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateBranch(id: number, data: UpdateBranchDto): Promise<Branch> {
  return apiFetch<Branch>(`/api/v1/branches/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteBranch(id: number): Promise<void> {
  return apiFetch<void>(`/api/v1/branches/${id}`, { method: "DELETE" });
}
