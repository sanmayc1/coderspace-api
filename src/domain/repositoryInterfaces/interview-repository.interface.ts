import { IInterviewEntity } from "../entities/interview-entity";
import { IBaseRepository } from "./base-repository.interface";
import { IMongoOptions } from "./problem-repository.interface";


export interface IInterviewRepository extends IBaseRepository<IInterviewEntity>{
    getAllInterviews(query:IMongoOptions):Promise<{interviews:IInterviewEntity[],total:number}>
    
    
}