export type SaleRecord = {
  id: number;
  branchId: number;
  productId: number;
  date: string;
  quantity: number;
  delivery: number;
  leftover: number;
  reject: number;
  sold: number;
  revenue: number;
};

export type DailySalesSummary = {
  date: string;
  totalSold: number;
  totalRevenue: number;
  totalReject: number;
  totalLeftover: number;
};

export type SalesQueryParams = {
  startDate: string;
  endDate: string;
};
