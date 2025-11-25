import { inject, injectable } from "tsyringe";
import { IDeleteTestcaseUsecase } from "../../Interfaces/admin/problem-management/delete-testcase.usecase.interface.js";
import { ITestcaseRepository } from "../../../domain/repositoryInterfaces/testcase-respository.interface.js";
import { CustomError } from "../../../domain/utils/custom-error.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constant.js";


@injectable()
export class DeleteTestcaseUsecase implements IDeleteTestcaseUsecase {
  constructor(
    @inject("ITestcaseRepository")
    private _testcaseRepository: ITestcaseRepository
  ) {}

  async execute(id: string): Promise<void> {

    const exists = await this._testcaseRepository.findById(id)

    if(!exists){
        throw new CustomError(HTTP_STATUS.BAD_REQUEST,ERROR_MESSAGES.TESTCASE_NOT_FOUND)
    }

    await this._testcaseRepository.deleteById(id)
  }
}
