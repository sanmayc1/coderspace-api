import { injectable } from "tsyringe";
import { ITestcaseEntity } from "../../domain/entities/testcase-entity.js";
import { ITestcaseRepository } from "../../domain/repositoryInterfaces/testcase-respository.interface.js";
import { testcaseRepositoryMapper } from "../../frameworks/database/dtoMappers/dto.mapper.js";
import {
  ITestcaseModel,
  TestcaseModel,
} from "../../frameworks/database/models/testcase.model.js";
import { BaseRepository } from "./base-repository.js";

@injectable()
export class TestcaseRepository
  extends BaseRepository<ITestcaseModel, ITestcaseEntity>
  implements ITestcaseRepository
{
  constructor() {
    super(
      TestcaseModel,
      testcaseRepositoryMapper.toEntity,
      testcaseRepositoryMapper.toModel
    );
  }
  async getTestcasesByProblemId(problemId: string): Promise<ITestcaseEntity[]> {
    const testcases = await TestcaseModel.find({ problemId });
    return testcases.map((testcase) =>
      testcaseRepositoryMapper.toEntity(testcase)
    );
  }
}
