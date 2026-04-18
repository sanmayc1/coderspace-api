export interface IDashboardStats {
  quicktab: {
    totalUsers: number;
    activeSubscriptions: number;
    totalProblems: number;
    totalInterviews: number;
  };
  monthlyGrowthData: { name: string; users: number; revenue: number }[];
}

export interface IAdminDashboardRepository {
  getDashboardStats(): Promise<IDashboardStats>;
}
