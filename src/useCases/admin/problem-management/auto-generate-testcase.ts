import { inject, injectable } from 'tsyringe';
import { IAutoGenerateTestcasesUsecasse } from '../../Interfaces/admin/problem-management/auto-generate-testcase';
import { IGeminiService } from '../../../domain/services/gemini-service.interface';
import { IProblemRepository } from '../../../domain/repositoryInterfaces/problem-repository.interface';
import { ITestcaseRepository } from '../../../domain/repositoryInterfaces/testcase-respository.interface';
import { CustomError } from '../../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constant';
import { ITestcaseEntity } from '../../../domain/entities/testcase-entity';

@injectable()
export class AutoGenerateTestcasesUsecasse implements IAutoGenerateTestcasesUsecasse {
  constructor(
    @inject('IGeminiService') private _geminiService: IGeminiService,
    @inject('IProblemRepository') private _problemRepository: IProblemRepository,
    @inject('ITestcaseRepository')
    private _testcaseRepository: ITestcaseRepository
  ) {}
  async executes(id: string): Promise<void> {
    const problem = await this._problemRepository.findById(id);
    const testcases = await this._testcaseRepository.getTestcasesByProblemId(
      problem?._id as string
    );

    if (testcases.length <= 0) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.NEED_MINIMUM_TESTCASE);
    }

    let newTestcases = await this._geminiService.generateTestcase(
      JSON.stringify({title:problem?.title,description:problem?.description}),
      JSON.stringify(testcases[0])
    );
    const mapedTestcase: ITestcaseEntity[] = newTestcases.map((t) => ({
      input: t.input,
      output: t.output,
      problemId: id,
    }));
    console.log(mapedTestcase)
    await this._testcaseRepository.bulkUpload(mapedTestcase)
  }
}
