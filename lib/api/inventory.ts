import { apiFetch } from "./client";
import type {
  InventoryRecord,
  CreateInventoryDto,
  UpdateInventoryDto,
} from "@/lib/types/inventory";

export async function getInventory(): Promise<InventoryRecord[]> {
  return apiFetch<InventoryRecord[]>("/api/v1/inventory");
}

export async function getInventoryById(id: number): Promise<InventoryRecord> {
  return apiFetch<InventoryRecord>(`/api/v1/inventory/${id}`);
}

export async function getInventoryByBranch(branchId: number): Promise<InventoryRecord[]> {
  return apiFetch<InventoryRecord[]>(`/api/v1/inventory/branch/${branchId}`);
}

export async function getInventoryByProduct(productId: number): Promise<InventoryRecord[]> {
  return apiFetch<InventoryRecord[]>(`/api/v1/inventory/product/${productId}`);
}

export async function getInventoryByBranchDate(
  branchId: number,
  date: string,
): Promise<InventoryRecord[]> {
  return apiFetch<InventoryRecord[]>(
    `/api/v1/inventory/branch/${branchId}/date?date=${date}`,
  );
}

export async function createInventory(data: CreateInventoryDto): Promise<InventoryRecord> {
  return apiFetch<InventoryRecord>("/api/v1/inventory", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function createInventoryBulk(
  data: CreateInventoryDto[],
): Promise<InventoryRecord[]> {
  return apiFetch<InventoryRecord[]>("/api/v1/inventory/bulk", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateInventory(
  id: number,
  data: UpdateInventoryDto,
): Promise<InventoryRecord> {
  return apiFetch<InventoryRecord>(`/api/v1/inventory/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteInventory(id: number): Promise<void> {
  return apiFetch<void>(`/api/v1/inventory/${id}`, { method: "DELETE" });
}
