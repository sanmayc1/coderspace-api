import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import {
  commonResponse,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../auth/index.js";
import { createContestSchema, companyContestQuerySchema } from "./validation/schema.js";
import { ICreateContestUsecase } from "../../../useCases/Interfaces/company/create-contest.usecase.interface.js";
import { IGetCompanyContestsUsecase } from "../../../useCases/Interfaces/company/get-company-contests.usecase.interface.js";

@injectable()
export class CompanyContestController {
  constructor(
    @inject("ICreateContestUsecase")
    private _createContestUsecase: ICreateContestUsecase,
    @inject("IGetCompanyContestsUsecase")
    private _getCompanyContestsUsecase: IGetCompanyContestsUsecase
  ) {}

  async createContest(req: Request, res: Response) {
    const validatedContest = createContestSchema.parse(req.body);
    const accountId = req.user?.accountId as string;
    await this._createContestUsecase.execute(validatedContest, accountId);
    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.CONTEST_CREATED));
  }

  async getContests(req: Request, res: Response) {
    const validatedQuery = companyContestQuerySchema.parse(req.query);
    const accountId = req.user?.accountId as string;
    const response = await this._getCompanyContestsUsecase.execute(
      accountId,
      validatedQuery
    );
    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.CONTESTS_FETCHED, response));
  }
}

