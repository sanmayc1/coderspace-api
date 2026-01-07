import { inject, injectable } from 'tsyringe';
import { ICompilerService } from '../../../domain/services/compiler-service.interface';
import { IRunProblemUsecase } from '../../Interfaces/users/problem/run-problem.usecase.interface';
import { availableLanguages, ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constant';
import { CustomError } from '../../../domain/utils/custom-error';
import { IProblemRepository } from '../../../domain/repositoryInterfaces/problem-repository.interface';
import { ITestcaseRepository } from '../../../domain/repositoryInterfaces/testcase-respository.interface';
import { ILanguageEntity } from '../../../domain/entities/langauge-entity';
import { normalize } from '../../../shared/utils/helper';

@injectable()
export class RunProblemUsecase implements IRunProblemUsecase {
  constructor(
    @inject('ICompilerService') private _compilerService: ICompilerService,
    @inject('IProblemRepository') private _problemRepository: IProblemRepository,
    @inject('ITestcaseRepository') private _testcaseRepository: ITestcaseRepository
  ) {}

  async execute(language: string, code: string, problemId: string): Promise<void> {
    const selectedLanguage = availableLanguages[language as keyof typeof availableLanguages];

    if (!selectedLanguage) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.INVALID_LANGUAGE);
    }

    const problem = await this._problemRepository.getProblem(problemId, {
      relations: ['addedLanguagesId'],
    });
    const selectedLanguageExist = (problem?.addedLanguagesId as ILanguageEntity[]).find(
      (lang) => lang.language === language
    );

    if (!selectedLanguageExist) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.INVALID_LANGUAGE);
    }

    const testcases = await this._testcaseRepository.getTestcasesByProblemId(problemId);

    if (selectedLanguage.name === 'javascript') {
      for (let i = 0; i < 3; i++) {
        const testCode = `
        ${code} \n
       console.log(${selectedLanguageExist.functionName}(...${testcases[i].input}))
      `;
        const result = await this._compilerService.runCode(
          testCode,
          selectedLanguage.name,
          selectedLanguage.version,
          selectedLanguage.extension
        );

        const normalizedOutput = normalize(result.stdout);
        console.log(result)
        if (result.stderr) {
          throw new CustomError(HTTP_STATUS.BAD_REQUEST, result.stderr);
          
        }

        if(result.status !== null){
          throw new CustomError(HTTP_STATUS.BAD_REQUEST, String(result.message));
         
        }

        if (
          JSON.stringify(JSON.parse(normalizedOutput)) !==
          JSON.stringify(JSON.parse(testcases[i].output))
        ) {
          throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.WRONG_ANSWER);
        }
      }
    }
  }
}
