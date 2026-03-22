import { injectable } from 'tsyringe';
import { IInterviewRepository } from '../../domain/repositoryInterfaces/interview-repository.interface';
import { BaseRepository } from './base-repository';
import { IInterviewEntity } from '../../domain/entities/interview-entity';
import { IInterviewModel, InterviewModel } from '../../frameworks/database/models/interview.model';
import { interviewRepositoryMapper } from '../../frameworks/database/dtoMappers/dto.mapper';

@injectable()
export class InterviewRepository
  extends BaseRepository<IInterviewModel, IInterviewEntity>
  implements IInterviewRepository
{
  constructor() {
    super(InterviewModel, interviewRepositoryMapper.toEntity, interviewRepositoryMapper.toModel);
  }
}
