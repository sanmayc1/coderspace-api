import { inject, injectable } from 'tsyringe';
import { IGetDashboardUsecase } from '../Interfaces/company/get-dashboard.usecase.interface';
import { IContestRepository } from '../../domain/repositoryInterfaces/contest-repository.interface';

@injectable()
export class GetDashboardUsecase implements IGetDashboardUsecase {
  constructor(
    @inject('IContestRepository')
    private _contestRepository: IContestRepository
  ) {}

  async execute(accountId: string): Promise<any> {
    const stats = await this._contestRepository.getCompanyDashboardStats(accountId);
    
    return {
      quicktab: {
        totalContests: stats.totalContests,
        totalParticipants: stats.totalParticipants,
        activeContests: stats.activeContests,
        upcomingContests: stats.upcomingContests,
      },
      chart: stats.monthlyParticipantsData
    };
  }
}
