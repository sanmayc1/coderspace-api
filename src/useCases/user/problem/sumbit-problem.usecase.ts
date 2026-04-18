import { inject, injectable } from 'tsyringe';
import { ICompilerService } from '../../../domain/services/compiler-service.interface';
import {
  availableLanguages,
  ERROR_MESSAGES,
  HTTP_STATUS,
  SCORES,
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
import { testCodeGenerators } from '../../../shared/testCodeGenerator';
import { ThinkingLevel } from '@google/genai';
import { INotificationRepository } from '../../../domain/repositoryInterfaces/notification-repository.interface';

@injectable()
export class SubmitProblemUsecase implements ISubmitProblemUsecase {
  constructor(
    @inject('ICompilerService') private _compilerService: ICompilerService,
    @inject('IProblemRepository') private _problemRepository: IProblemRepository,
    @inject('ITestcaseRepository') private _testcaseRepository: ITestcaseRepository,
    @inject('IUserRepository') private _userRepository: IUserRepository,
    @inject('ISubmitProblemRepository') private _submitProblemRepository: ISubmitProblemRepository,
    @inject('INotificationRepository') private _notificationRepository: INotificationRepository
  ) {}

  async execute(data: ISubmitProblemUsecaseInputDto): Promise<ISubmitProblemUsecaseOutputDto> {
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
    let levelReached = user.level as number;
    let badgeReached = user.badge as string;
    let xpCoinEarned = 0;
    for (let i = 0; i < testcases.length; i++) {
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
        results.push({
          input: JSON.parse(testcases[i].input)
            .map((arg: any, i: number) => `param${i + 1} = ${JSON.stringify(arg)}`)
            .join(',  '),
          output: normalizedOutput,
          expected: normalizeMongoOutput(testcases[i].output),
          isCorrect: false,
        });
        allTestCasePassed = false;
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

    if (!allTestCasePassed) {
      await this._submitProblemRepository.create({
        problemId: data.problemId,
        userId: user._id as string,
        language: data.language as TLanguages,
        solution: data.solution,
        status: 'attempted',
      });
    } else {
      const submissions = await this._submitProblemRepository.getAllSubmissionByProblemIdAndUserId(
        data.problemId,
        user._id as string
      );
      const previouslySolved = submissions.find((s) => s.status === 'solved');
      await this._submitProblemRepository.create({
        problemId: data.problemId,
        userId: user._id as string,
        language: data.language as TLanguages,
        solution: data.solution,
        status: 'solved',
      });

      if (!previouslySolved) {
        const newGlobalScore =
          (user?.globalScore as number) + SCORES[problem.difficulty as keyof typeof SCORES] * 10;
        const newXpCoin =
          (user?.xpCoin as number) + SCORES[problem.difficulty as keyof typeof SCORES] * 10;

        const newLevel = Math.min(100, Math.floor(newGlobalScore / 10));
        const newBadge = newLevel >= 50 ? 'gold' : newLevel === 100 ? 'platinum' : 'silver';

        if (newLevel > levelReached) {
          levelReached = newLevel;

          await this._notificationRepository.create({
            accountId: data.accountId,
            title: 'Level Up',
            message: `Congratulations! You have reached level ${newLevel}`,
            type: 'level_up',
            isRead: false,
          });
        }
        if (newBadge !== badgeReached) {
          badgeReached = newBadge;

          await this._notificationRepository.create({
            accountId: data.accountId,
            title: 'Badge Unlocked',
            message: `Congratulations! You have unlocked ${newBadge} badge`,
            type: 'badge_unlocked',
            isRead: false,
          });
        }

        xpCoinEarned = SCORES[problem.difficulty as keyof typeof SCORES] * 10;

        await this._userRepository.updateById(user._id as string, {
          globalScore: newGlobalScore,
          xpCoin: newXpCoin,
          level: newLevel,
          ...(newBadge !== user.badge && { badge: newBadge }),
        });
      }
    }

    return {
      testcases: results,
      success: allTestCasePassed,
      levelReached,
      badgeReached,
      xpCoinEarned,
    };
  }
}
