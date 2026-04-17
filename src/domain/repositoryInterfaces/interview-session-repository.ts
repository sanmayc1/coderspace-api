import { IInterviewSessionEntity } from "../entities/interview-session";
import { IBaseRepository } from "./base-repository.interface";



export interface IInterviewSessionRepository extends IBaseRepository<IInterviewSessionEntity>{
    checkSessionExist(interviewId:string,accountId:string):Promise<boolean>
    findByInterviewIdAndAccountId(interviewId:string,accountId:string):Promise<IInterviewSessionEntity | null>
}