"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getInventory,
  getInventoryById,
  getInventoryByBranch,
  getInventoryByProduct,
  getInventoryByBranchDate,
  createInventory,
  createInventoryBulk,
  updateInventory,
  deleteInventory,
} from "@/lib/api/inventory";
import { queryKeys } from "@/lib/query-keys";
import type { CreateInventoryDto, UpdateInventoryDto } from "@/lib/types/inventory";

export function useInventory() {
  return useQuery({
    queryKey: queryKeys.inventory.all(),
    queryFn: getInventory,
  });
}

export function useInventoryRecord(id: number) {
  return useQuery({
    queryKey: queryKeys.inventory.detail(id),
    queryFn: () => getInventoryById(id),
    enabled: !!id,
  });
}

export function useInventoryByBranch(branchId: number) {
  return useQuery({
    queryKey: queryKeys.inventory.byBranch(branchId),
    queryFn: () => getInventoryByBranch(branchId),
    enabled: !!branchId,
  });
}

export function useInventoryByProduct(productId: number) {
  return useQuery({
    queryKey: queryKeys.inventory.byProduct(productId),
    queryFn: () => getInventoryByProduct(productId),
    enabled: !!productId,
  });
}

export function useInventoryByBranchDate(branchId: number, date: string) {
  return useQuery({
    queryKey: queryKeys.inventory.byBranchDate(branchId, date),
    queryFn: () => getInventoryByBranchDate(branchId, date),
    enabled: !!branchId && !!date,
  });
}

export function useCreateInventory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateInventoryDto) => createInventory(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.inventory.all() });
      queryClient.invalidateQueries({
        queryKey: queryKeys.inventory.byBranch(variables.branchId),
      });
    },
  });
}

export function useCreateInventoryBulk() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateInventoryDto[]) => createInventoryBulk(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.inventory.all() });
    },
  });
}

export function useUpdateInventory(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateInventoryDto) => updateInventory(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.inventory.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.inventory.detail(id) });
      queryClient.invalidateQueries({
        queryKey: queryKeys.inventory.byBranch(result.branchId),
      });
    },
  });
}

export function useDeleteInventory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteInventory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.inventory.all() });
    },
  });
}
