export type RecipeItem = {
  id: number;
  materialId: number;
  quantity: number;
  unit: string;
};

export type Recipe = {
  id: number;
  productId: number;
  notes?: string;
  items: RecipeItem[];
  createdAt: string;
  updatedAt: string;
};

export type CreateRecipeItemDto = {
  materialId: number;
  quantity: number;
  unit: string;
};

export type CreateRecipeDto = {
  productId: number;
  notes?: string;
  items: CreateRecipeItemDto[];
};

export type UpdateRecipeDto = {
  notes?: string;
  items?: CreateRecipeItemDto[];
};
