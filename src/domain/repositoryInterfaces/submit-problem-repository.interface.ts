import { IBaseRepository } from './base-repository.interface';
import { ISubmitProblemEntity } from '../entities/submit-problem.entity';

export interface ISubmitProblemRepository extends IBaseRepository<ISubmitProblemEntity> {
    getAllSubmissionByProblemIdAndUserId(problemId:string,userId:string):Promise<ISubmitProblemEntity[]>
}
