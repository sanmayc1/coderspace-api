import { inject, injectable } from 'tsyringe';
import { IContestProblemSubmitUsecase } from '../../Interfaces/users/contest/contest-problem-submit.usecase.interface';
import {
  IContestProblemSubmitUsecaseInputDto,
  IContestProblemSubmitUsecaseOutputDto,
} from '../../dtos/user.dto';
import { ICompilerService } from '../../../domain/services/compiler-service.interface';
import { IProblemRepository } from '../../../domain/repositoryInterfaces/problem-repository.interface';
import { ITestcaseRepository } from '../../../domain/repositoryInterfaces/testcase-respository.interface';
import { IUserRepository } from '../../../domain/repositoryInterfaces/user-repository.interface';
import {
  availableLanguages,
  CONTEST_SCORE_BASED_ON_DIFFICULTY,
  ERROR_MESSAGES,
  HTTP_STATUS,
  VALIDATORS,
} from '../../../shared/constant';
import { CustomError } from '../../../domain/utils/custom-error';
import { ILanguageEntity } from '../../../domain/entities/langauge-entity';
import { testCodeGenerators } from '../../../shared/testCodeGenerator';
import { normalize } from '../../../shared/utils/helper';
import { normalizeMongoOutput } from '../../../shared/utils/helper';
import { IContestAttemptRepository } from '../../../domain/repositoryInterfaces/contest-attempt-repository.interface';
import { IContestRepository } from '../../../domain/repositoryInterfaces/contest-repository.interface';

@injectable()
export class ContestProblemSubmitUsecase implements IContestProblemSubmitUsecase {
  constructor(
    @inject('ICompilerService') private _compilerService: ICompilerService,
    @inject('IProblemRepository') private _problemRepository: IProblemRepository,
    @inject('ITestcaseRepository') private _testcaseRepository: ITestcaseRepository,
    @inject('IUserRepository') private _userRepository: IUserRepository,
    @inject('IContestAttemptRepository')
    private _contestAttemptRepository: IContestAttemptRepository,
    @inject('IContestRepository') private _contestRepository: IContestRepository
  ) {}

  async execute(
    data: IContestProblemSubmitUsecaseInputDto
  ): Promise<IContestProblemSubmitUsecaseOutputDto> {
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

    const user = await this._userRepository.findByAccountId(data.accountId);

    if (!user) {
      throw new CustomError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const testcases = await this._testcaseRepository.getTestcasesByProblemId(data.problemId);

    const validator = VALIDATORS[problem.validatorType as keyof typeof VALIDATORS];

    const testCodeGenerator = testCodeGenerators[selectedLanguage.name];

    let results: { input: string; output: string; expected: string; isCorrect: boolean }[] = [];
    let allTestCasePassed = true;
    for (let i = 0; i < testcases.length ; i++) {
      const testCode = testCodeGenerator(
        testcases[i],
        data.solution,
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

    if (allTestCasePassed) {
      results = results.slice(0, 3);
    } else {
      const failedTestCases = results.slice(3).filter((result) => !result.isCorrect);
      results = results.slice(0, 3);
      if (failedTestCases.length > 0) {
        results = [
          ...results,
          failedTestCases.pop() as {
            input: string;
            output: string;
            expected: string;
            isCorrect: boolean;
          },
        ];
      }
    }
    const contest = await this._contestRepository.findById(data.contestId);

    if (!contest) {
      throw new CustomError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.CONTEST_NOT_FOUND);
    }

    const contestAttempt = await this._contestAttemptRepository.getContestByUserIdAndContestId(
      user._id as string,
      contest._id as string
    );
    if (!contestAttempt) {
      throw new CustomError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.CONTEST_ATTEMPT_NOT_FOUND);
    }

    if (!allTestCasePassed) {
      await this._contestAttemptRepository.updateContestByUserIdAndContestId(
        user._id as string,
        contest._id as string,
        {
        contestId: contest._id,
        userId: user._id,
        totalProblems: contest.problemsIds.length,
        totalSubmissions: contestAttempt?.totalSubmissions + 1,
        endDateAndTime: new Date(),
      });
    } else {
      const score =
        contest.problemsIds.length * CONTEST_SCORE_BASED_ON_DIFFICULTY[problem.difficulty] +
        contestAttempt?.score;

      await this._contestAttemptRepository.updateContestByUserIdAndContestId(
        user._id as string,
        contest._id as string,
        {
          contestId: contest._id,
          userId: user._id,
          totalProblems: contest.problemsIds.length,
          totalSubmissions: contestAttempt?.totalSubmissions + 1,
          endDateAndTime: new Date(),
          score: score,
          solvedProblems: contestAttempt?.solvedProblems + 1,
        }
      );
    }

    return {
      testcases: results,
      success: allTestCasePassed,
    };
  }
}
