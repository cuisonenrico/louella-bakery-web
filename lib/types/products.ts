export type ProductType = "BREAD" | "CAKE" | "SPECIAL";

export type Product = {
  id: number;
  name: string;
  type: ProductType;
  price: number;
  date?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateProductDto = {
  name: string;
  type: ProductType;
  price: number;
  date?: string;
};

export type UpdateProductDto = Partial<CreateProductDto>;
