import { ITestcaseEntity } from "../entities/testcase-entity.js";
import { IBaseRepository } from "./base-repository.interface.js";




export interface ITestcaseRepository extends IBaseRepository<ITestcaseEntity> {
    getTestcasesByProblemId(problemId:string):Promise<ITestcaseEntity[]>
}