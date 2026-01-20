import { inject, injectable } from 'tsyringe';
import { ICompilerService } from '../../../domain/services/compiler-service.interface';
import { IRunProblemUsecase } from '../../Interfaces/users/problem/run-problem.usecase.interface';
import {
  availableLanguages,
  ERROR_MESSAGES,
  HTTP_STATUS,
  TLanguages,
  VALIDATORS,
} from '../../../shared/constant';
import { CustomError } from '../../../domain/utils/custom-error';
import { IProblemRepository } from '../../../domain/repositoryInterfaces/problem-repository.interface';
import { ITestcaseRepository } from '../../../domain/repositoryInterfaces/testcase-respository.interface';
import { ILanguageEntity } from '../../../domain/entities/langauge-entity';
import { normalize, normalizeMongoOutput } from '../../../shared/utils/helper';
import { ISubmitProblemUsecase } from '../../Interfaces/users/problem/sumbit-problem.usecase.interface';
import { ISubmitProblemUsecaseInputDto, ISubmitProblemUsecaseOutputDto } from '../../dtos/user.dto';
import { IUserRepository } from '../../../domain/repositoryInterfaces/user-repository.interface';
import { ISubmitProblemRepository } from '../../../domain/repositoryInterfaces/submit-problem-repository.interface';
import { ITestcaseEntity } from '../../../domain/entities/testcase-entity';

@injectable()
export class SubmitProblemUsecase implements ISubmitProblemUsecase {
  constructor(
    @inject('ICompilerService') private _compilerService: ICompilerService,
    @inject('IProblemRepository') private _problemRepository: IProblemRepository,
    @inject('ITestcaseRepository') private _testcaseRepository: ITestcaseRepository,
    @inject('IUserRepository') private _userRepository: IUserRepository,
    @inject('ISubmitProblemRepository') private _submitProblemRepository: ISubmitProblemRepository
  ) {}

  async execute(data: ISubmitProblemUsecaseInputDto): Promise<void> {
    const selectedLanguage = availableLanguages[data.language as keyof typeof availableLanguages];

    if (!selectedLanguage) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.INVALID_LANGUAGE);
    }

    const problem = await this._problemRepository.getProblem(data.problemId, {
      relations: ['addedLanguagesId'],
    });

    if (!problem) {
      throw new CustomError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.PROBLEM_NOT_FOUND);
    }
    const selectedLanguageExist = (problem?.addedLanguagesId as ILanguageEntity[]).find(
      (lang) => lang.language === data.language
    );

    if (!selectedLanguageExist) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.INVALID_LANGUAGE);
    }

    const testcases = await this._testcaseRepository.getTestcasesByProblemId(data.problemId);
    const user = await this._userRepository.findByAccountId(data.accountId);
    if (!user) {
      throw new CustomError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.USER_NOT_FOUND);
    }
    const validator = VALIDATORS[problem.validatorType as keyof typeof VALIDATORS];

    const javascriptTestCodeGenerator = (testcase: ITestcaseEntity) => {
      return `
      ${data.solution} \n
     console.log(${selectedLanguageExist.functionName}(${JSON.parse(testcase.input).reduce((acc: string, cur: string, index: number) => acc.concat(`${JSON.stringify(cur)}${index === JSON.parse(testcase.input).length - 1 ? '' : ','}`), '')}))
    `
    }

    if (selectedLanguage.name === 'javascript') {
      for (let i = 0; i < testcases.length; i++) {
        const testCode = javascriptTestCodeGenerator(testcases[i]);

        const result = await this._compilerService.runCode(
          testCode,
          selectedLanguage.name,
          selectedLanguage.version,
          selectedLanguage.extension
        );

        const normalizedOutput = normalize(result.stdout);

        if (result.stderr) {
          throw new CustomError(HTTP_STATUS.BAD_REQUEST, result.stderr);
        }

        if (result.status !== null) {
          throw new CustomError(HTTP_STATUS.BAD_REQUEST, String(result.message));
        }

        const isCorrect = validator(normalizeMongoOutput(testcases[i].output), normalizedOutput);
        if (!isCorrect) {
          throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.WRONG_ANSWER);
        }
      }
    }
  }
}
