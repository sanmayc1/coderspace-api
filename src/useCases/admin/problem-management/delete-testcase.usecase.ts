import { inject, injectable } from 'tsyringe';
import { IDeleteTestcaseUsecase } from '../../Interfaces/admin/problem-management/delete-testcase.usecase.interface';
import { ITestcaseRepository } from '../../../domain/repositoryInterfaces/testcase-respository.interface';
import { CustomError } from '../../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constant';

@injectable()
export class DeleteTestcaseUsecase implements IDeleteTestcaseUsecase {
  constructor(
    @inject('ITestcaseRepository')
    private _testcaseRepository: ITestcaseRepository
  ) {}

  async execute(id: string): Promise<void> {
    const exists = await this._testcaseRepository.findById(id);

    if (!exists) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.TESTCASE_NOT_FOUND);
    }

    await this._testcaseRepository.deleteById(id);
  }
}
