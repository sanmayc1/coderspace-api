import { ITestcaseEntity } from '../entities/testcase-entity';
import { IBaseRepository } from './base-repository.interface';
import { IMongoOptions } from './problem-repository.interface';

export interface ITestcaseRepository extends IBaseRepository<ITestcaseEntity> {
  getTestcasesByProblemId(problemId: string,options?:Partial<IMongoOptions>): Promise<ITestcaseEntity[]>;
}
