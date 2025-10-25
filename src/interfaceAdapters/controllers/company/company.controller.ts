import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import {
  commonResponse,
  HTTP_STATUS,
  IJwtPayload,
  SUCCESS_MESSAGES,
} from "../auth/index.js";
import { IGetCompanyUsecase } from "../../../useCases/Interfaces/company/get-company.usecase.interface.js";

@injectable()
export class CompanyController {
  constructor(
    @inject("IGetCompanyUsecase") private _getCompanyUsecase: IGetCompanyUsecase
  ) {}

  async getCompany(req: Request, res: Response): Promise<void> {
    const accountId = req.user?.accountId as string;

    const response = await this._getCompanyUsecase.execute(accountId);

    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.COMPANY_FETCHED, response));
  }
}
