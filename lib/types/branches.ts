export type Branch = {
  id: number;
  name: string;
  address: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateBranchDto = {
  name: string;
  address: string;
  phone: string;
  isActive?: boolean;
};

export type UpdateBranchDto = Partial<CreateBranchDto>;
