import { inject, injectable } from 'tsyringe';
import { IGetAllInterviewsUsecase } from '../../Interfaces/admin/interview-management/get-all-interviews.usecase.interface';
import {
  IGetAllInterviewsUsecaseInputDto,
  IGetAllInterviewsUsecaseOutputDto,
} from '../../dtos/admin.dto';
import { IInterviewRepository } from '../../../domain/repositoryInterfaces/interview-repository.interface';
import { GenericFilter, Projection, Sort } from '../../../shared/constant';
import { createInterviewUsecaseMapper } from '../../dtos/mappers/mappers';

@injectable()
export class GetAllInterviewsUsecase implements IGetAllInterviewsUsecase {
  constructor(@inject('IInterviewRepository') private _interviewRepository: IInterviewRepository) {}
  async execute(
    query: IGetAllInterviewsUsecaseInputDto
  ): Promise<IGetAllInterviewsUsecaseOutputDto> {
    const sort: Sort = { [query.sortBy]: 'desc' };
    const filter: GenericFilter = query.search
      ? { title: { op: 'contains', value: query.search } }
      : {};

    const limit = query.limit;
    const skip = (query.page - 1) * limit;

    const { interviews, total } = await this._interviewRepository.getAllInterviews({
      sort,
      skip,
      limit,
      filter,
    });

    const totalPages = Math.ceil(total / limit);
    return {
      currentPage: query.page,
      totalPages,
      interviews: interviews.map((interview) => createInterviewUsecaseMapper.toResponse(interview)),
      itemsPerPage: limit,
    };
  }
}
