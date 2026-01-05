import { inject, injectable } from 'tsyringe';
import { IGetCompanyContestsUsecase } from '../Interfaces/company/get-company-contests.usecase.interface';
import { IContestRepository } from '../../domain/repositoryInterfaces/contest-repository.interface';
import {
  IGetCompanyContestUsecaseInputDto,
  IGetCompanyContestUsecaseOutputDto,
} from '../dtos/company.dto';

@injectable()
export class GetCompanyContestsUsecase implements IGetCompanyContestsUsecase {
  private readonly limit = 10;

  constructor(
    @inject('IContestRepository')
    private _contestRepository: IContestRepository
  ) {}

  async execute(
    accountId: string,
    query: IGetCompanyContestUsecaseInputDto
  ): Promise<IGetCompanyContestUsecaseOutputDto> {
    const page = query.page || 1;
    const search = query.search || '';
    const skip = (page - 1) * this.limit;

    const { contests, total } = await this._contestRepository.getCompanyContests({
      creatorId: accountId,
      search,
      limit: this.limit,
      skip,
    });

    const totalPages = total === 0 ? 0 : Math.ceil(total / this.limit);

    return {
      contests: contests.map((contest) => ({
        id: contest._id as string,
        title: contest.title,
        description: contest.description,
        dateAndTime: contest.dateAndTime,
        duration: contest.duration,
        view: contest.view,
      })),
      totalPages,
      currentPage: page,
    };
  }
}
