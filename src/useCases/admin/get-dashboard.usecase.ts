import { inject, injectable } from 'tsyringe';
import { IGetAdminDashboardUsecase } from '../Interfaces/admin/get-dashboard.usecase.interface';
import { IAdminDashboardRepository, IDashboardStats } from '../../domain/repositoryInterfaces/admin-dashboard-repository.interface';

@injectable()
export class GetAdminDashboardUsecase implements IGetAdminDashboardUsecase {
  constructor(
    @inject('IAdminDashboardRepository') private _dashboardRepository: IAdminDashboardRepository
  ) {}

  async execute(): Promise<IDashboardStats> {
    return this._dashboardRepository.getDashboardStats();
  }
}
