import { inject, injectable } from 'tsyringe';
import { IUpdateAnswerAndFeedbackUsecase } from '../../Interfaces/users/interview/update-answer-and-feedback.usecase.interface';
import { IInterviewQuestionsRepository } from '../../../domain/repositoryInterfaces/interview-questions-repository';
import { IGeminiService } from '../../../domain/services/gemini-service.interface';
import { IInterviewSessionRepository } from '../../../domain/repositoryInterfaces/interview-session-repository';
import { CustomError } from '../../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constant';

@injectable()
export class UpdateAnswerAndFeedbackUsecase implements IUpdateAnswerAndFeedbackUsecase {
  constructor(
    @inject('IInterviewQuestionsRepository')
    private _interviewQuestionsRepository: IInterviewQuestionsRepository,
    @inject('IInterviewSessionRepository')
    private _interviewSessionRepository: IInterviewSessionRepository,
    @inject('IGeminiService') private _geminiService: IGeminiService
  ) {}
  async execute(sessionId: string, order: number, answer: string): Promise<void> {
   
    const existSession = await this._interviewSessionRepository.findById(sessionId);
    if (!existSession) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.SESSION_NOT_FOUND);
    }
    const existQuestion = await this._interviewQuestionsRepository.findBySessionIdAndOrder(
      sessionId,
      order
    );
    if (!existQuestion) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.INTERVIEW_QUESTION_NOT_FOUND);
    }

    await this._interviewQuestionsRepository.updateById(existQuestion._id, {
      answer,
      attempted: true,
    });
  }
}
