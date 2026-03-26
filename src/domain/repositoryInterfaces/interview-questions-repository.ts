import { IInterviewQuestionsEntity } from "../entities/interview-questions";
import { IBaseRepository } from "./base-repository.interface";





export interface IInterviewQuestionsRepository extends IBaseRepository<IInterviewQuestionsEntity>{
    findBySessionIdAndOrder(sessionId:string,order:number):Promise<IInterviewQuestionsEntity | null>;
}