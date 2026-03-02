export type Material = {
  id: number;
  name: string;
  unit: string;
  pricePerUnit: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateMaterialDto = {
  name: string;
  unit: string;
  pricePerUnit: number;
};

export type UpdateMaterialDto = Partial<CreateMaterialDto>;
