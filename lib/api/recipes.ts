import { apiFetch } from "./client";
import type { Recipe, CreateRecipeDto, UpdateRecipeDto } from "@/lib/types/recipes";

export async function getRecipes(): Promise<Recipe[]> {
  return apiFetch<Recipe[]>("/api/v1/recipes");
}

export async function getRecipeById(id: number): Promise<Recipe> {
  return apiFetch<Recipe>(`/api/v1/recipes/${id}`);
}

export async function getRecipeByProduct(productId: number): Promise<Recipe> {
  return apiFetch<Recipe>(`/api/v1/recipes/product/${productId}`);
}

export async function createRecipe(data: CreateRecipeDto): Promise<Recipe> {
  return apiFetch<Recipe>("/api/v1/recipes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateRecipe(id: number, data: UpdateRecipeDto): Promise<Recipe> {
  return apiFetch<Recipe>(`/api/v1/recipes/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteRecipe(id: number): Promise<void> {
  return apiFetch<void>(`/api/v1/recipes/${id}`, { method: "DELETE" });
}
