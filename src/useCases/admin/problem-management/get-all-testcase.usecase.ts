import { inject, injectable } from "tsyringe";
import { IGetAllTestcaseUsecaseOutputDto } from "../../dtos/admin.dto.js";
import { IGetAllTestcaseUsecase } from "../../Interfaces/admin/problem-management/get-all-testcases.usecasee.interface.js";
import { ITestcaseRepository } from "../../../domain/repositoryInterfaces/testcase-respository.interface.js";
import { getAllTestcaseUsecaseMapper } from "../../dtos/mappers/mappers.js";

@injectable()
export class GetAllTestcaseUsecase implements IGetAllTestcaseUsecase {
  constructor(
    @inject("ITestcaseRepository")
    private _testcaseRepository: ITestcaseRepository
  ) {}
  async execute(problemId: string): Promise<IGetAllTestcaseUsecaseOutputDto[]> {
    const testcases = await this._testcaseRepository.getTestcasesByProblemId(
      problemId
    );

    return testcases.map((t) => getAllTestcaseUsecaseMapper.toRespone(t));
  }
}
