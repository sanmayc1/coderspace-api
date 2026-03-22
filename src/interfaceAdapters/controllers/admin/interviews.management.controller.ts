import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { interviewSchema } from './validation/schema';
import { ICreateInterviewUseCase } from '../../../useCases/Interfaces/admin/interview-management/create-interview.usecase.interface';
import { commonResponse, HTTP_STATUS, SUCCESS_MESSAGES } from '../auth';

@injectable()
export class InterviewManagementAdminController {
  constructor(
    @inject('ICreateInterviewUsecase')
    private _createInterviewUseCase: ICreateInterviewUseCase
  ) {}

  async createInterview(req: Request, res: Response) {
    const validatedData = interviewSchema.parse(req.body);
    await this._createInterviewUseCase.execute(validatedData);
    res.status(HTTP_STATUS.OK).json(commonResponse(true, SUCCESS_MESSAGES.INTERVIEW_CREATED));
  }
}
