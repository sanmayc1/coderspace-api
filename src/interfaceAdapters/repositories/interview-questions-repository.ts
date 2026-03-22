import { injectable } from 'tsyringe';
import { IInterviewQuestionsEntity } from '../../domain/entities/interview-questions';
import { IInterviewQuestionsRepository } from '../../domain/repositoryInterfaces/interview-questions-repository';
import { interviewQuestionsRepositoryMapper } from '../../frameworks/database/dtoMappers/dto.mapper';
import { IInterviewQuestionsModel, InterviewQuestionsModel } from '../../frameworks/database/models/interview-questions.model';
import { BaseRepository } from './base-repository';

@injectable()
export class InterviewQuestionsRepository
  extends BaseRepository<IInterviewQuestionsModel, IInterviewQuestionsEntity>
  implements IInterviewQuestionsRepository
{
  constructor() {
    super(
      InterviewQuestionsModel,
      interviewQuestionsRepositoryMapper.toEntity,
      interviewQuestionsRepositoryMapper.toModel
    );
  }
}
