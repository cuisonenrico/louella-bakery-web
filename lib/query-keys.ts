export const queryKeys = {
  branches: {
    all: () => ["branches"] as const,
    detail: (id: number) => ["branches", id] as const,
  },
  products: {
    all: () => ["products"] as const,
    detail: (id: number) => ["products", id] as const,
  },
  inventory: {
    all: () => ["inventory"] as const,
    byBranch: (branchId: number) => ["inventory", "branch", branchId] as const,
    byProduct: (productId: number) => ["inventory", "product", productId] as const,
    byBranchDate: (branchId: number, date: string) =>
      ["inventory", "branch", branchId, "date", date] as const,
    detail: (id: number) => ["inventory", id] as const,
  },
  sales: {
    byBranchDate: (branchId: number, date: string) =>
      ["sales", "branch", branchId, "date", date] as const,
    byBranch: (branchId: number, startDate: string, endDate: string) =>
      ["sales", "branch", branchId, startDate, endDate] as const,
    byBranchProduct: (branchId: number, productId: number, startDate: string, endDate: string) =>
      ["sales", "branch", branchId, "product", productId, startDate, endDate] as const,
    byProduct: (productId: number, startDate: string, endDate: string) =>
      ["sales", "product", productId, startDate, endDate] as const,
    summary: (branchId: number, startDate: string, endDate: string) =>
      ["sales", "summary", branchId, startDate, endDate] as const,
  },
  materials: {
    all: () => ["materials"] as const,
    detail: (id: number) => ["materials", id] as const,
  },
  recipes: {
    all: () => ["recipes"] as const,
    detail: (id: number) => ["recipes", id] as const,
    byProduct: (productId: number) => ["recipes", "product", productId] as const,
  },
  materialInventory: {
    all: () => ["material-inventory"] as const,
    byBranch: (branchId: number) => ["material-inventory", "branch", branchId] as const,
    byMaterial: (materialId: number) => ["material-inventory", "material", materialId] as const,
    byBranchDate: (branchId: number, date: string) =>
      ["material-inventory", "branch", branchId, "date", date] as const,
    detail: (id: number) => ["material-inventory", id] as const,
  },
};
