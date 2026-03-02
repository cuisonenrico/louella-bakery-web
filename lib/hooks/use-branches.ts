"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch,
} from "@/lib/api/branches";
import { queryKeys } from "@/lib/query-keys";
import type { CreateBranchDto, UpdateBranchDto } from "@/lib/types/branches";

export function useBranches() {
  return useQuery({
    queryKey: queryKeys.branches.all(),
    queryFn: getBranches,
  });
}

export function useBranch(id: number) {
  return useQuery({
    queryKey: queryKeys.branches.detail(id),
    queryFn: () => getBranchById(id),
    enabled: !!id,
  });
}

export function useCreateBranch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateBranchDto) => createBranch(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.branches.all() });
    },
  });
}

export function useUpdateBranch(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateBranchDto) => updateBranch(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.branches.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.branches.detail(id) });
    },
  });
}

export function useDeleteBranch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteBranch(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.branches.all() });
    },
  });
}
