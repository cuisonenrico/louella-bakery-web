export type MaterialInventoryRecord = {
  id: number;
  branchId: number;
  materialId: number;
  date: string;
  quantity: number;
  delivery: number;
  leftover: number;
  reject: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateMaterialInventoryDto = {
  branchId: number;
  materialId: number;
  date: string;
  quantity: number;
  delivery: number;
  leftover: number;
  reject: number;
  notes?: string;
};

export type UpdateMaterialInventoryDto = Partial<
  Pick<CreateMaterialInventoryDto, "quantity" | "delivery" | "leftover" | "reject" | "notes">
>;
