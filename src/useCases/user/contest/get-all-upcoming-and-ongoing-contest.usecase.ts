import { inject, injectable } from 'tsyringe';
import { IGetAllUpcomingAndOngoingContestUseCaseInterface } from '../../Interfaces/users/contest/get-all-upcoming-and-ongoing-contest.usecase.interface';
import { IGetAllUpcomingAndOngoingContestUsecaseOutputDto } from '../../dtos/user.dto';
import { IContestRepository } from '../../../domain/repositoryInterfaces/contest-repository.interface';
import { GenericFilter, Projection } from '../../../shared/constant';
import { getAllContestUsecaseMapper } from '../../dtos/mappers/mappers';

@injectable()
export class GetAllUpcomingAndOngoingContestUseCase implements IGetAllUpcomingAndOngoingContestUseCaseInterface {
  constructor(@inject('IContestRepository') private contestRepository: IContestRepository) {}

  async execute(page: number): Promise<IGetAllUpcomingAndOngoingContestUsecaseOutputDto> {
    const skip = (page - 1) * 6;
    const limit = 6;
    const filter: GenericFilter = {
      endDateAndTime: { op: 'gte', value: Date.now() },
      view: { op: 'eq', value: 'public' },
    };
    const relations = ['domainId', 'skillsIds', 'creatorId'];
    const projections:Projection = [
      '_id',
      'title',
      'dateAndTime',
      'view',
      'creatorId',
      'skillsIds',
      'domainId',
      'description',
      'duration',
    ];
    const docs = await this.contestRepository.getAllContests({
      skip,
      limit,
      filter,
      relations,
      projections,
    });
    const contests = docs.contests.map(getAllContestUsecaseMapper.toResponse);

    return {
      contests,
      totalPages: Math.ceil(docs.count / limit),
      currentPage: page,
    };
  }
}
