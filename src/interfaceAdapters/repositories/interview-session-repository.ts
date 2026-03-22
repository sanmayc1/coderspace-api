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
}