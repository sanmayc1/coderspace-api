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
 async findBySessionId(sessionId: string): Promise<IInterviewQuestionsEntity[] | null> {
    const questions = await InterviewQuestionsModel.find({sessionId});
    return questions ? questions.map(interviewQuestionsRepositoryMapper.toEntity) : null;
  }
async  findBySessionIdAndOrder(sessionId: string, order: number): Promise<IInterviewQuestionsEntity |null> {
    const question = await InterviewQuestionsModel.findOne({sessionId,order});
 
    return question ? interviewQuestionsRepositoryMapper.toEntity(question) : null;
  }
}
