import { inject } from 'tsyringe';
import { ITestcaseRepository } from '../../../domain/repositoryInterfaces/testcase-respository.interface';
import { IAddSingleTestcaseUsecase } from '../../Interfaces/admin/problem-management/add-single-testcase.usecase.interface';
import { IAddSingleTestcaseInputDto } from '../../dtos/admin.dto';
import { injectable } from 'tsyringe';
import { normalize, normalizeMongoOutput } from '../../../shared/utils/helper';
import { CustomError } from '../../../domain/utils/custom-error';
import {
  availableLanguages,
  ERROR_MESSAGES,
  HTTP_STATUS,
  TLanguages,
  VALIDATORS,
} from '../../../shared/constant';
import { IProblemRepository } from '../../../domain/repositoryInterfaces/problem-repository.interface';
import { testCodeGenerators } from '../../../shared/testCodeGenerator';
import { ILanguageEntity } from '../../../domain/entities/langauge-entity';
import { ICompilerService } from '../../../domain/services/compiler-service.interface';

@injectable()
export class AddSingleTestcaseUsecase implements IAddSingleTestcaseUsecase {
  constructor(
    @inject('ITestcaseRepository')
    private _testcaseRepository: ITestcaseRepository,
    @inject('IProblemRepository')
    private _problemRepository: IProblemRepository,
    @inject('ICompilerService')
    private _compilerService: ICompilerService
  ) {}
  async execute(
    input: IAddSingleTestcaseInputDto
  ): Promise<{
    isAllPassed: boolean;
    passedLanguages: { language: TLanguages; isPassed: boolean }[];
  }> {
    const allTestcase = await this._testcaseRepository.getTestcasesByProblemId(input.problemId);

    for (const testcase of allTestcase) {
      if (
        normalizeMongoOutput(testcase.input) === normalize(input.input) &&
        normalizeMongoOutput(testcase.output) === normalize(input.output)
      ) {
        throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.TESTCASE_ALREADY_EXISTS);
      }
    }

    const problem = await this._problemRepository.getProblem(input.problemId, {
      relations: ['addedLanguagesId'],
    });
    if (!problem) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.PROBLEM_NOT_FOUND);
    }

    if (problem.addedLanguagesId.length === 0) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.NO_LANGUAGE_ADDED_TO_PROBLEM);
    }

    const validator = VALIDATORS[problem.validatorType as keyof typeof VALIDATORS];
    const passedLanguages: { language: TLanguages; isPassed: boolean }[] = [];

    for (let i = 0; i < problem.addedLanguagesId.length; i++) {
      const selectedLanguageExist = problem.addedLanguagesId[i] as ILanguageEntity;
      const selectedLanguage =
        availableLanguages[selectedLanguageExist?.language as keyof typeof availableLanguages];
      const testCodeGenerator =
        testCodeGenerators[selectedLanguage?.name as keyof typeof testCodeGenerators];
      const testCode = testCodeGenerator(
        input,
        selectedLanguageExist?.solution as string,
        selectedLanguageExist?.functionName as string
      );

      const result = await this._compilerService.runCode(
        testCode,
        selectedLanguage?.name,
        selectedLanguage?.version,
        selectedLanguage?.extension

      );
      
      if (result.stderr) {
         passedLanguages.push({ language: selectedLanguageExist.language, isPassed: false });
         
         continue;
      }

      if (result.status !== null) {
        passedLanguages.push({ language: selectedLanguageExist.language, isPassed: false });
        
        continue;
      }

      const normalizedOutput = normalize(result.stdout);

      const isCorrect = validator(normalizeMongoOutput(input.output), normalizedOutput);
   
      if (!isCorrect) {
        passedLanguages.push({ language: selectedLanguageExist.language, isPassed: false });
      } else {
        passedLanguages.push({ language: selectedLanguageExist.language, isPassed: true });
      }
    }
   
    const isAllPassed = passedLanguages.every((item) => item.isPassed);

    if (!isAllPassed) {
      return {
        isAllPassed,
        passedLanguages,
      };
    }

    await this._testcaseRepository.create({
      ...input,
      ...(input.example ? { example: true } : { example: false }),
    });

    return {
      isAllPassed,
      passedLanguages,
    };
  }
}
