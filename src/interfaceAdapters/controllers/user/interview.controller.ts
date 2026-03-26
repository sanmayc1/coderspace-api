import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { ITtsAndSttService } from '../../../domain/services/tts-and-stt-service.interface';
import { IGetAllInterviewsUserUsecase } from '../../../useCases/Interfaces/users/interview/get-all-interviews-user.usecase';
import { commonResponse, HTTP_STATUS, SUCCESS_MESSAGES } from '../auth';
import { ICreateInterviewSessionUsecase } from '../../../useCases/Interfaces/users/interview/create-interview-session.usecase';
import { IGetInterviewQuestionUsecase } from '../../../useCases/Interfaces/users/interview/get-interview.question.usecase.interface';

@injectable()
export class InterviewController {
  

  constructor(
    @inject('IGetAllInterviewsUserUsecase')
    private _getAllInterviewsUserUsecase: IGetAllInterviewsUserUsecase,
    @inject('ICreateInterviewSessionUsecase') private _createInterviewSessionUsecase: ICreateInterviewSessionUsecase,
    @inject('IGetInterviewQuestionUsecase') private _getInterviewQuestionUsecase: IGetInterviewQuestionUsecase
  ) {}

  async getAllInterviews(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const data = await this._getAllInterviewsUserUsecase.execute(page);
    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.INTERVIEWS_FETCHED, data));
  }

  async createInterviewSession(req: Request, res: Response) {
    const {interviewId} = req.body;
    const accountId = req.user?.accountId;
    const data = await this._createInterviewSessionUsecase.execute(interviewId,accountId as string);
    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.INTERVIEW_SESSION_CREATED, data));
  }


  async getInterviewQuestion(req: Request, res: Response) {
    const {sessionId} = req.params;
    const order = Number(req.query.order) || 1;
   
    const data = await this._getInterviewQuestionUsecase.execute(sessionId,order);
    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.INTERVIEW_QUESTION_FETCHED, data));
  }
}
