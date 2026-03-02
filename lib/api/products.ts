import { apiFetch } from "./client";
import type { Product, CreateProductDto, UpdateProductDto } from "@/lib/types/products";

export async function getProducts(): Promise<Product[]> {
  return apiFetch<Product[]>("/api/v1/products");
}

export async function getProductById(id: number): Promise<Product> {
  return apiFetch<Product>(`/api/v1/products/${id}`);
}

export async function createProduct(data: CreateProductDto): Promise<Product> {
  return apiFetch<Product>("/api/v1/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function createProductsBulk(data: CreateProductDto[]): Promise<Product[]> {
  return apiFetch<Product[]>("/api/v1/products/bulk", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateProduct(id: number, data: UpdateProductDto): Promise<Product> {
  return apiFetch<Product>(`/api/v1/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteProduct(id: number): Promise<void> {
  return apiFetch<void>(`/api/v1/products/${id}`, { method: "DELETE" });
}
