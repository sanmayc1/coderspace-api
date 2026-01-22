import { inject, injectable } from 'tsyringe';
import { ICompilerService } from '../../../domain/services/compiler-service.interface';
import { IRunProblemUsecase } from '../../Interfaces/users/problem/run-problem.usecase.interface';
import {
  availableLanguages,
  ERROR_MESSAGES,
  HTTP_STATUS,
  VALIDATORS,
} from '../../../shared/constant';
import { CustomError } from '../../../domain/utils/custom-error';
import { IProblemRepository } from '../../../domain/repositoryInterfaces/problem-repository.interface';
import { ITestcaseRepository } from '../../../domain/repositoryInterfaces/testcase-respository.interface';
import { ILanguageEntity } from '../../../domain/entities/langauge-entity';
import { normalize, normalizeMongoOutput } from '../../../shared/utils/helper';
import { IRunProblemUsecaseOutputDto } from '../../dtos/user.dto';
import { testCodeGenerators } from '../../../shared/testCodeGenerator';

@injectable()
export class RunProblemUsecase implements IRunProblemUsecase {
  constructor(
    @inject('ICompilerService') private _compilerService: ICompilerService,
    @inject('IProblemRepository') private _problemRepository: IProblemRepository,
    @inject('ITestcaseRepository') private _testcaseRepository: ITestcaseRepository
  ) {}

  async execute(
    language: string,
    code: string,
    problemId: string
  ): Promise<IRunProblemUsecaseOutputDto> {
    const selectedLanguage = availableLanguages[language as keyof typeof availableLanguages];

    if (!selectedLanguage) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.INVALID_LANGUAGE);
    }

    const problem = await this._problemRepository.getProblem(problemId, {
      relations: ['addedLanguagesId'],
    });

    if (!problem) {
      throw new CustomError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.PROBLEM_NOT_FOUND);
    }

    const selectedLanguageExist = (problem?.addedLanguagesId as ILanguageEntity[]).find(
      (lang) => lang.language === language
    );

    if (!selectedLanguageExist) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.INVALID_LANGUAGE);
    }

    const testcases = await this._testcaseRepository.getTestcasesByProblemId(problemId);

    const length = testcases.length < 3 ? testcases.length : 3;

    const validator = VALIDATORS[problem.validatorType as keyof typeof VALIDATORS];

    const testCodeGenerator = testCodeGenerators[selectedLanguage.name];

    const results: { input: string; output: string; expected: string; isCorrect: boolean }[] = [];
    let allTestCasePassed = true;
    for (let i = 0; i < length; i++) {
      const testCode = testCodeGenerator(
        testcases[i],
        code,
        selectedLanguageExist.functionName as string
      );

      const result = await this._compilerService.runCode(
        testCode,
        selectedLanguage.name,
        selectedLanguage.version,
        selectedLanguage.extension
      );

      if (result.stderr) {
        throw new CustomError(HTTP_STATUS.BAD_REQUEST, result.stderr);
      }

      if (result.status !== null) {
        throw new CustomError(HTTP_STATUS.BAD_REQUEST, String(result.output));
      }

      const normalizedOutput = normalize(result.stdout);

      const isCorrect = validator(normalizeMongoOutput(testcases[i].output), normalizedOutput);
      if (!isCorrect) {
        allTestCasePassed = false;
        results.push({
          input: JSON.parse(testcases[i].input)
            .map((arg: any, i: number) => `param${i + 1} = ${JSON.stringify(arg)}`)
            .join(',  '),
          output: normalizedOutput,
          expected: normalizeMongoOutput(testcases[i].output),
          isCorrect: false,
        });
      } else {
        results.push({
          input: JSON.parse(testcases[i].input)
            .map((arg: any, i: number) => `param${i + 1} = ${JSON.stringify(arg)}`)
            .join(',  '),
          output: normalizedOutput,
          expected: normalizeMongoOutput(testcases[i].output),
          isCorrect: true,
        });
      }
    }
    return {
      testcases: results,
      success: allTestCasePassed,
    };
  }
}
