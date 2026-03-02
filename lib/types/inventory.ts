export type InventoryRecord = {
  id: number;
  branchId: number;
  productId: number;
  date: string;
  quantity: number;
  delivery: number;
  leftover: number;
  reject: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateInventoryDto = {
  branchId: number;
  productId: number;
  date: string;
  quantity: number;
  delivery: number;
  leftover: number;
  reject: number;
  notes?: string;
};

export type UpdateInventoryDto = Partial<
  Pick<CreateInventoryDto, "quantity" | "delivery" | "leftover" | "reject" | "notes">
>;
