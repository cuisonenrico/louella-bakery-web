"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMaterials,
  getMaterialById,
  createMaterial,
  createMaterialsBulk,
  updateMaterial,
  deleteMaterial,
} from "@/lib/api/materials";
import { queryKeys } from "@/lib/query-keys";
import type { CreateMaterialDto, UpdateMaterialDto } from "@/lib/types/materials";

export function useMaterials() {
  return useQuery({
    queryKey: queryKeys.materials.all(),
    queryFn: getMaterials,
  });
}

export function useMaterial(id: number) {
  return useQuery({
    queryKey: queryKeys.materials.detail(id),
    queryFn: () => getMaterialById(id),
    enabled: !!id,
  });
}

export function useCreateMaterial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateMaterialDto) => createMaterial(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.materials.all() });
    },
  });
}

export function useCreateMaterialsBulk() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateMaterialDto[]) => createMaterialsBulk(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.materials.all() });
    },
  });
}

export function useUpdateMaterial(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateMaterialDto) => updateMaterial(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.materials.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.materials.detail(id) });
    },
  });
}

export function useDeleteMaterial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteMaterial(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.materials.all() });
    },
  });
}
