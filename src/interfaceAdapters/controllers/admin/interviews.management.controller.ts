import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { interviewQuerySchema, interviewSchema } from './validation/schema';
import { ICreateInterviewUseCase } from '../../../useCases/Interfaces/admin/interview-management/create-interview.usecase.interface';
import { commonResponse, HTTP_STATUS, SUCCESS_MESSAGES } from '../auth';
import { IGetAllInterviewsUsecase } from '../../../useCases/Interfaces/admin/interview-management/get-all-interviews.usecase.interface';
import { IDeleteInterviewUsecase } from '../../../useCases/Interfaces/admin/interview-management/delete-interview.usecase.interface';

@injectable()
export class InterviewManagementAdminController {
  constructor(
    @inject('ICreateInterviewUsecase')
    private _createInterviewUseCase: ICreateInterviewUseCase,
    @inject('IGetAllInterviewsUsecase')
    private _getAllInterviewsUsecase: IGetAllInterviewsUsecase,
    @inject('IDeleteInterviewUsecase')
    private _deleteInterviewUseCase: IDeleteInterviewUsecase,
  ) {}

  async createInterview(req: Request, res: Response) {
    const validatedData = interviewSchema.parse(req.body);
    const interview = await this._createInterviewUseCase.execute(validatedData);
    res.status(HTTP_STATUS.OK).json(commonResponse(true, SUCCESS_MESSAGES.INTERVIEW_CREATED,interview));
  }
  async getAllInterviews(req: Request, res: Response) {
   const query = req.query
   const valiedatedQuery = interviewQuerySchema.parse(query)
   const data = await this._getAllInterviewsUsecase.execute(valiedatedQuery)
   res.status(HTTP_STATUS.OK).json(commonResponse(true, SUCCESS_MESSAGES.INTERVIEWS_FETCHED,data));
  }

  async deleteInterview(req:Request,res:Response){
    const id = req.params.id
    const interview = await this._deleteInterviewUseCase.execute(id)
    res.status(HTTP_STATUS.OK).json(commonResponse(true, SUCCESS_MESSAGES.INTERVIEW_DELETED,interview));
  }
}
