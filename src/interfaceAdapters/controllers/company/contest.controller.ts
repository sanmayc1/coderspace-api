import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { commonResponse, HTTP_STATUS, SUCCESS_MESSAGES } from '../auth/index';
import { createContestSchema, companyContestQuerySchema } from './validation/schema';
import { ICreateContestUsecase } from '../../../useCases/Interfaces/company/contests/create-contest.usecase.interface';
import { IGetAllCompanyContestsUsecase } from '../../../useCases/Interfaces/company/contests/get-all-company-contests.usecase.interface';
import { IGetContestUsecase } from '../../../useCases/Interfaces/company/contests/get-contest.usecase.interface';

@injectable()
export class CompanyContestController {
  constructor(
    @inject('ICreateContestUsecase')
    private _createContestUsecase: ICreateContestUsecase,
    @inject('IGetAllCompanyContestsUsecase')
    private _getAllCompanyContestsUsecase: IGetAllCompanyContestsUsecase,
    @inject('IGetContestUsecase')
    private _getContestByIdUsecase: IGetContestUsecase
  ) {}

  async createContest(req: Request, res: Response) {
    const validatedContest = createContestSchema.parse(req.body);
    const accountId = req.user?.accountId as string;
    await this._createContestUsecase.execute(validatedContest, accountId);
    res.status(HTTP_STATUS.OK).json(commonResponse(true, SUCCESS_MESSAGES.CONTEST_CREATED));
  }

  async getAllContests(req: Request, res: Response) {
    const validatedQuery = companyContestQuerySchema.parse(req.query);
    const accountId = req.user?.accountId as string;
    const response = await this._getAllCompanyContestsUsecase.execute(accountId, validatedQuery);
    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.CONTESTS_FETCHED, response));
  }

  async getContestById(req: Request, res: Response) {
    const {id} = req.params
    const response = await this._getContestByIdUsecase.execute(id);
    res.status(HTTP_STATUS.OK).json(commonResponse(true, SUCCESS_MESSAGES.CONTEST_FETCHED, response));
  }
}
