import { inject, injectable } from 'tsyringe';
import { ICreateInterviewSessionUsecase } from '../../Interfaces/users/interview/create-interview-session.usecase';
import { IInterviewSessionRepository } from '../../../domain/repositoryInterfaces/interview-session-repository';
import { ICreateInterviewSessionUsecaseOutputDto } from '../../dtos/user.dto';
import { IInterviewRepository } from '../../../domain/repositoryInterfaces/interview-repository.interface';
import { CustomError } from '../../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constant';
import { IAccountsRepository } from '../../../domain/repositoryInterfaces/accounts-repository.interface';
import { IGeminiService } from '../../../domain/services/gemini-service.interface';
import { IInterviewQuestionsRepository } from '../../../domain/repositoryInterfaces/interview-questions-repository';

@injectable()
export class CreateInterviewSessionUsecase implements ICreateInterviewSessionUsecase {
  constructor(
    @inject('IInterviewSessionRepository')
    private _interviewSessionRepository: IInterviewSessionRepository,
    @inject('IInterviewRepository') private _interviewRepository: IInterviewRepository,
    @inject('IAccountRepository') private _accountRepository: IAccountsRepository,
    @inject('IGeminiService') private _geminiService: IGeminiService,
    @inject('IInterviewQuestionsRepository')
    private _interviewQuestionsRepository: IInterviewQuestionsRepository
  ) {}

  async execute(
    interviewId: string,
    accountId: string
  ): Promise<ICreateInterviewSessionUsecaseOutputDto> {
    const interviewExist = await this._interviewRepository.findById(interviewId);
    if (!interviewExist) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.INTERVIEW_NOT_FOUND);
    }
    const accountExist = await this._accountRepository.findById(accountId);
    if (!accountExist) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
    }

    const sessionExists = await this._interviewSessionRepository.checkSessionExist(
      interviewId,
      accountId
    );
    if (sessionExists) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.SESSION_ALREADY_EXISTS);
    }

    const questions = await this._geminiService.generateInterviewQuestions(
      interviewExist,
      accountExist.name
    );

    const interviewSession = await this._interviewSessionRepository.create({
      accountId,
      interviewId,
      completedAt: new Date(),
      startedAt: new Date(),
    });

    for (let i = 0; i < questions.length; i++) {
      await this._interviewQuestionsRepository.create({
        sessionId: interviewSession._id,
        question: questions[i].question,
        order: questions[i].questionNumber,
      });
    }

    

    return { sessionId: interviewSession._id };
  }
}
