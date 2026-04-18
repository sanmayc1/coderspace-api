import { IDashboardStats } from "../../../domain/repositoryInterfaces/admin-dashboard-repository.interface";

export interface IGetAdminDashboardUsecase {
  execute(): Promise<IDashboardStats>;
}
