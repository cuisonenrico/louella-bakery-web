import { apiFetch } from "./client";
import type {
  MaterialInventoryRecord,
  CreateMaterialInventoryDto,
  UpdateMaterialInventoryDto,
} from "@/lib/types/material-inventory";

export async function getMaterialInventory(): Promise<MaterialInventoryRecord[]> {
  return apiFetch<MaterialInventoryRecord[]>("/api/v1/material-inventory");
}

export async function getMaterialInventoryById(id: number): Promise<MaterialInventoryRecord> {
  return apiFetch<MaterialInventoryRecord>(`/api/v1/material-inventory/${id}`);
}

export async function getMaterialInventoryByBranch(
  branchId: number,
): Promise<MaterialInventoryRecord[]> {
  return apiFetch<MaterialInventoryRecord[]>(`/api/v1/material-inventory/branch/${branchId}`);
}

export async function getMaterialInventoryByMaterial(
  materialId: number,
): Promise<MaterialInventoryRecord[]> {
  return apiFetch<MaterialInventoryRecord[]>(
    `/api/v1/material-inventory/material/${materialId}`,
  );
}

export async function getMaterialInventoryByBranchDate(
  branchId: number,
  date: string,
): Promise<MaterialInventoryRecord[]> {
  return apiFetch<MaterialInventoryRecord[]>(
    `/api/v1/material-inventory/branch/${branchId}/date?date=${date}`,
  );
}

export async function createMaterialInventory(
  data: CreateMaterialInventoryDto,
): Promise<MaterialInventoryRecord> {
  return apiFetch<MaterialInventoryRecord>("/api/v1/material-inventory", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function createMaterialInventoryBulk(
  data: CreateMaterialInventoryDto[],
): Promise<MaterialInventoryRecord[]> {
  return apiFetch<MaterialInventoryRecord[]>("/api/v1/material-inventory/bulk", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateMaterialInventory(
  id: number,
  data: UpdateMaterialInventoryDto,
): Promise<MaterialInventoryRecord> {
  return apiFetch<MaterialInventoryRecord>(`/api/v1/material-inventory/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteMaterialInventory(id: number): Promise<void> {
  return apiFetch<void>(`/api/v1/material-inventory/${id}`, { method: "DELETE" });
}
