"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getSalesByBranchDate,
  getSalesByBranch,
  getSalesByBranchProduct,
  getSalesByProduct,
  getSalesSummaryByBranch,
} from "@/lib/api/sales";
import { queryKeys } from "@/lib/query-keys";

export function useSalesByBranchDate(branchId: number, date: string) {
  return useQuery({
    queryKey: queryKeys.sales.byBranchDate(branchId, date),
    queryFn: () => getSalesByBranchDate(branchId, date),
    enabled: !!branchId && !!date,
  });
}

export function useSalesByBranch(branchId: number, startDate: string, endDate: string) {
  return useQuery({
    queryKey: queryKeys.sales.byBranch(branchId, startDate, endDate),
    queryFn: () => getSalesByBranch(branchId, startDate, endDate),
    enabled: !!branchId && !!startDate && !!endDate,
  });
}

export function useSalesByBranchProduct(
  branchId: number,
  productId: number,
  startDate: string,
  endDate: string,
) {
  return useQuery({
    queryKey: queryKeys.sales.byBranchProduct(branchId, productId, startDate, endDate),
    queryFn: () => getSalesByBranchProduct(branchId, productId, startDate, endDate),
    enabled: !!branchId && !!productId && !!startDate && !!endDate,
  });
}

export function useSalesByProduct(productId: number, startDate: string, endDate: string) {
  return useQuery({
    queryKey: queryKeys.sales.byProduct(productId, startDate, endDate),
    queryFn: () => getSalesByProduct(productId, startDate, endDate),
    enabled: !!productId && !!startDate && !!endDate,
  });
}

export function useSalesSummary(branchId: number, startDate: string, endDate: string) {
  return useQuery({
    queryKey: queryKeys.sales.summary(branchId, startDate, endDate),
    queryFn: () => getSalesSummaryByBranch(branchId, startDate, endDate),
    enabled: !!branchId && !!startDate && !!endDate,
  });
}
