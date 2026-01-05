import { inject } from 'tsyringe';
import { ITestcaseRepository } from '../../../domain/repositoryInterfaces/testcase-respository.interface';
import { IAddSingleTestcaseUsecase } from '../../Interfaces/admin/problem-management/add-single-testcase.usecase.interface';
import { IAddSingleTestcaseInputDto } from '../../dtos/admin.dto';
import { injectable } from 'tsyringe';

@injectable()
export class AddSingleTestcaseUsecase implements IAddSingleTestcaseUsecase {
  constructor(
    @inject('ITestcaseRepository')
    private _testcaseRepository: ITestcaseRepository
  ) {}
  async execute(input: IAddSingleTestcaseInputDto): Promise<void> {
    await this._testcaseRepository.create({
      ...input,
      ...(input.example ? { example: true } : { example: false }),
    });
  }
}
