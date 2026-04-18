import { inject, injectable } from 'tsyringe';
import { IGetInterviewQuestionUsecase } from '../../Interfaces/users/interview/get-interview.question.usecase.interface';
import { IInterviewQuestionsRepository } from '../../../domain/repositoryInterfaces/interview-questions-repository';
import { CustomError } from '../../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constant';
import { ITtsAndSttService } from '../../../domain/services/tts-and-stt-service.interface';
import { IGetInterviewQuestionUsecaseOutputDto } from '../../dtos/user.dto';

@injectable()
export class GetInterviewQuestionUsecase implements IGetInterviewQuestionUsecase {
  constructor(
    @inject('IInterviewQuestionsRepository')
    private _interviewQuestionsRepository: IInterviewQuestionsRepository,
    @inject('ITtsAndSttService')
    private _ttsAndSttService: ITtsAndSttService
  ) {}
  async execute(sessionId: string, order: number): Promise<IGetInterviewQuestionUsecaseOutputDto> {
    const question = await this._interviewQuestionsRepository.findBySessionIdAndOrder(
      sessionId,
      order
    );

    
    if (!question) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.INTERVIEW_QUESTION_NOT_FOUND);
    }
    const audio = await this._ttsAndSttService.textToSpeech(question.question);
  
    return { question: question.question, audio, questionNumber: question.order };
  }
}
