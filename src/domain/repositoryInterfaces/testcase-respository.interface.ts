import { ITestcaseEntity } from '../entities/testcase-entity';
import { IBaseRepository } from './base-repository.interface';

export interface ITestcaseRepository extends IBaseRepository<ITestcaseEntity> {
  getTestcasesByProblemId(problemId: string): Promise<ITestcaseEntity[]>;
}
