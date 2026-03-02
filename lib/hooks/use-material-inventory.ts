"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMaterialInventory,
  getMaterialInventoryById,
  getMaterialInventoryByBranch,
  getMaterialInventoryByMaterial,
  getMaterialInventoryByBranchDate,
  createMaterialInventory,
  createMaterialInventoryBulk,
  updateMaterialInventory,
  deleteMaterialInventory,
} from "@/lib/api/material-inventory";
import { queryKeys } from "@/lib/query-keys";
import type {
  CreateMaterialInventoryDto,
  UpdateMaterialInventoryDto,
} from "@/lib/types/material-inventory";

export function useMaterialInventory() {
  return useQuery({
    queryKey: queryKeys.materialInventory.all(),
    queryFn: getMaterialInventory,
  });
}

export function useMaterialInventoryRecord(id: number) {
  return useQuery({
    queryKey: queryKeys.materialInventory.detail(id),
    queryFn: () => getMaterialInventoryById(id),
    enabled: !!id,
  });
}

export function useMaterialInventoryByBranch(branchId: number) {
  return useQuery({
    queryKey: queryKeys.materialInventory.byBranch(branchId),
    queryFn: () => getMaterialInventoryByBranch(branchId),
    enabled: !!branchId,
  });
}

export function useMaterialInventoryByMaterial(materialId: number) {
  return useQuery({
    queryKey: queryKeys.materialInventory.byMaterial(materialId),
    queryFn: () => getMaterialInventoryByMaterial(materialId),
    enabled: !!materialId,
  });
}

export function useMaterialInventoryByBranchDate(branchId: number, date: string) {
  return useQuery({
    queryKey: queryKeys.materialInventory.byBranchDate(branchId, date),
    queryFn: () => getMaterialInventoryByBranchDate(branchId, date),
    enabled: !!branchId && !!date,
  });
}

export function useCreateMaterialInventory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateMaterialInventoryDto) => createMaterialInventory(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.materialInventory.all() });
      queryClient.invalidateQueries({
        queryKey: queryKeys.materialInventory.byBranch(variables.branchId),
      });
    },
  });
}

export function useCreateMaterialInventoryBulk() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateMaterialInventoryDto[]) => createMaterialInventoryBulk(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.materialInventory.all() });
    },
  });
}

export function useUpdateMaterialInventory(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateMaterialInventoryDto) => updateMaterialInventory(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.materialInventory.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.materialInventory.detail(id) });
      queryClient.invalidateQueries({
        queryKey: queryKeys.materialInventory.byBranch(result.branchId),
      });
    },
  });
}

export function useDeleteMaterialInventory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteMaterialInventory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.materialInventory.all() });
    },
  });
}
