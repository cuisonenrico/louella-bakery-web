import { apiFetch } from "./client";
import type { Material, CreateMaterialDto, UpdateMaterialDto } from "@/lib/types/materials";

export async function getMaterials(): Promise<Material[]> {
  return apiFetch<Material[]>("/api/v1/materials");
}

export async function getMaterialById(id: number): Promise<Material> {
  return apiFetch<Material>(`/api/v1/materials/${id}`);
}

export async function createMaterial(data: CreateMaterialDto): Promise<Material> {
  return apiFetch<Material>("/api/v1/materials", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function createMaterialsBulk(data: CreateMaterialDto[]): Promise<Material[]> {
  return apiFetch<Material[]>("/api/v1/materials/bulk", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateMaterial(id: number, data: UpdateMaterialDto): Promise<Material> {
  return apiFetch<Material>(`/api/v1/materials/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteMaterial(id: number): Promise<void> {
  return apiFetch<void>(`/api/v1/materials/${id}`, { method: "DELETE" });
}
