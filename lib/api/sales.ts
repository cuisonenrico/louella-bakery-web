import { apiFetch } from "./client";
import type { SaleRecord, DailySalesSummary } from "@/lib/types/sales";

export async function getSalesByBranchDate(
  branchId: number,
  date: string,
): Promise<SaleRecord[]> {
  return apiFetch<SaleRecord[]>(
    `/api/v1/sales/branch/${branchId}/date?date=${date}`,
  );
}

export async function getSalesByBranch(
  branchId: number,
  startDate: string,
  endDate: string,
): Promise<SaleRecord[]> {
  return apiFetch<SaleRecord[]>(
    `/api/v1/sales/branch/${branchId}?startDate=${startDate}&endDate=${endDate}`,
  );
}

export async function getSalesByBranchProduct(
  branchId: number,
  productId: number,
  startDate: string,
  endDate: string,
): Promise<SaleRecord[]> {
  return apiFetch<SaleRecord[]>(
    `/api/v1/sales/branch/${branchId}/product/${productId}?startDate=${startDate}&endDate=${endDate}`,
  );
}

export async function getSalesByProduct(
  productId: number,
  startDate: string,
  endDate: string,
): Promise<SaleRecord[]> {
  return apiFetch<SaleRecord[]>(
    `/api/v1/sales/product/${productId}?startDate=${startDate}&endDate=${endDate}`,
  );
}

export async function getSalesSummaryByBranch(
  branchId: number,
  startDate: string,
  endDate: string,
): Promise<DailySalesSummary[]> {
  return apiFetch<DailySalesSummary[]>(
    `/api/v1/sales/branch/${branchId}/summary?startDate=${startDate}&endDate=${endDate}`,
  );
}
