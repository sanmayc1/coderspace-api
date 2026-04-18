import { injectable } from "tsyringe";
import { BaseRepository } from "./base-repository";
import { IInterviewSessionModel, InterviewSessionModel } from "../../frameworks/database/models/interview-session";
import { IInterviewSessionEntity } from "../../domain/entities/interview-session";
import { IInterviewSessionRepository } from "../../domain/repositoryInterfaces/interview-session-repository";
import { interviewSessionRepositoryMapper } from "../../frameworks/database/dtoMappers/dto.mapper";




@injectable()
export class InterviewSessionRepository extends BaseRepository<IInterviewSessionModel, IInterviewSessionEntity> implements IInterviewSessionRepository{
    constructor(){
        super(InterviewSessionModel, interviewSessionRepositoryMapper.toEntity, interviewSessionRepositoryMapper.toModel);
    }
   async checkSessionExist(interviewId: string, accountId: string): Promise<boolean> {
      
    const session = await InterviewSessionModel.findOne({interviewId,accountId});
    return !!session;
     
    }

    async findByInterviewIdAndAccountId(interviewId: string, accountId: string): Promise<IInterviewSessionEntity | null> {
      
      
      const session = await InterviewSessionModel.findOne({interviewId,accountId});
      
      return session ? interviewSessionRepositoryMapper.toEntity(session) : null;
    }
}