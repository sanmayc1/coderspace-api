import { inject, injectable } from 'tsyringe';
import { IFinishInterviewUsecase } from '../../Interfaces/users/interview/finish-interview.usecase.interface';
import { IGeminiService } from '../../../domain/services/gemini-service.interface';
import { IInterviewSessionRepository } from '../../../domain/repositoryInterfaces/interview-session-repository';
import { IInterviewQuestionsRepository } from '../../../domain/repositoryInterfaces/interview-questions-repository';
import { CustomError } from '../../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constant';

@injectable()
export class FinishInterviewUsecase implements IFinishInterviewUsecase {
  constructor(
    @inject('IInterviewSessionRepository')
    private _interviewSessionRepository: IInterviewSessionRepository,
    @inject('IGeminiService') private _geminiService: IGeminiService,
    @inject('IInterviewQuestionsRepository')
    private _interviewQuestionsRepository: IInterviewQuestionsRepository
  ) {}
  async execute(sessionId: string): Promise<void> {
    const existSession = await this._interviewSessionRepository.findById(sessionId);
    if (!existSession) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.SESSION_NOT_FOUND);
    }
    const questions = await this._interviewQuestionsRepository.findBySessionId(sessionId);
    if(!questions){
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.QUESTIONS_NOT_FOUND);
    }

    const attemptedQuestions = questions.filter((q) => q.attempted);
    const feedback = await this._geminiService.generateInterviewAnswerFeedback(
      attemptedQuestions,
      questions.length,
      attemptedQuestions.length
    );
    await this._interviewSessionRepository.updateById(sessionId, {
      status: 'completed',
      overallFeedback:feedback.feedback,
      completedAt:new Date(),
      finalScore:feedback.rating,
    });
  }
}
