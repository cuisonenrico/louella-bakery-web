"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getRecipes,
  getRecipeById,
  getRecipeByProduct,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "@/lib/api/recipes";
import { queryKeys } from "@/lib/query-keys";
import type { CreateRecipeDto, UpdateRecipeDto } from "@/lib/types/recipes";

export function useRecipes() {
  return useQuery({
    queryKey: queryKeys.recipes.all(),
    queryFn: getRecipes,
  });
}

export function useRecipe(id: number) {
  return useQuery({
    queryKey: queryKeys.recipes.detail(id),
    queryFn: () => getRecipeById(id),
    enabled: !!id,
  });
}

export function useRecipeByProduct(productId: number) {
  return useQuery({
    queryKey: queryKeys.recipes.byProduct(productId),
    queryFn: () => getRecipeByProduct(productId),
    enabled: !!productId,
  });
}

export function useCreateRecipe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateRecipeDto) => createRecipe(data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.recipes.all() });
      queryClient.invalidateQueries({
        queryKey: queryKeys.recipes.byProduct(result.productId),
      });
    },
  });
}

export function useUpdateRecipe(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateRecipeDto) => updateRecipe(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.recipes.all() });
      queryClient.invalidateQueries({ queryKey: queryKeys.recipes.detail(id) });
      queryClient.invalidateQueries({
        queryKey: queryKeys.recipes.byProduct(result.productId),
      });
    },
  });
}

export function useDeleteRecipe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteRecipe(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.recipes.all() });
    },
  });
}
