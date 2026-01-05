import { injectable } from 'tsyringe';
import { ITestcaseEntity } from '../../domain/entities/testcase-entity';
import { ITestcaseRepository } from '../../domain/repositoryInterfaces/testcase-respository.interface';
import { testcaseRepositoryMapper } from '../../frameworks/database/dtoMappers/dto.mapper';
import { ITestcaseModel, TestcaseModel } from '../../frameworks/database/models/testcase.model';
import { BaseRepository } from './base-repository';

@injectable()
export class TestcaseRepository
  extends BaseRepository<ITestcaseModel, ITestcaseEntity>
  implements ITestcaseRepository
{
  constructor() {
    super(TestcaseModel, testcaseRepositoryMapper.toEntity, testcaseRepositoryMapper.toModel);
  }
  async getTestcasesByProblemId(problemId: string): Promise<ITestcaseEntity[]> {
    const testcases = await TestcaseModel.find({ problemId });
    return testcases.map((testcase) => testcaseRepositoryMapper.toEntity(testcase));
  }
}
