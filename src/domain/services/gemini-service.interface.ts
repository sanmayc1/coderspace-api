import { ITestcaseEntity } from "../entities/testcase-entity";




export interface IGeminiService {
    generateTestcase(problem:string,exampleTestCase:string):Promise<ITestcaseEntity[]>
}