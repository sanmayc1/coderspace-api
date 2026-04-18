import { injectable } from 'tsyringe';
import { IInterviewRepository } from '../../domain/repositoryInterfaces/interview-repository.interface';
import { BaseRepository } from './base-repository';
import { IInterviewEntity } from '../../domain/entities/interview-entity';
import { IInterviewModel, InterviewModel } from '../../frameworks/database/models/interview.model';
import { interviewRepositoryMapper } from '../../frameworks/database/dtoMappers/dto.mapper';
import { IMongoOptions } from '../../domain/repositoryInterfaces/problem-repository.interface';
import { convertToMongoFilter, convertToMongoSort } from '../../shared/utils/mongo-utils';

@injectable()
export class InterviewRepository
  extends BaseRepository<IInterviewModel, IInterviewEntity>
  implements IInterviewRepository
{
  constructor() {
    super(InterviewModel, interviewRepositoryMapper.toEntity, interviewRepositoryMapper.toModel);
  }
  async getAllInterviews(
    query: IMongoOptions
  ): Promise<{ interviews: IInterviewEntity[]; total: number }> {
    const limit = query.limit;
    const skip = query.skip;
    const sort = query.sort ? convertToMongoSort(query.sort) : {};
    const filter = query.filter ? convertToMongoFilter(query.filter) : {};

    const [interviews, total] = await Promise.all([
      InterviewModel.find(filter).sort(sort).skip(skip).limit(limit),
      InterviewModel.countDocuments(filter),
    ]);
    const mappedInterviews = interviews.map(interviewRepositoryMapper.toEntity);
    return { interviews: mappedInterviews, total };
  }
}
