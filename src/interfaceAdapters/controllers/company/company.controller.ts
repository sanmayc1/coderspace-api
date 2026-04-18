import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { commonResponse, HTTP_STATUS, SUCCESS_MESSAGES } from '../auth/index';
import { IGetCompanyUsecase } from '../../../useCases/Interfaces/company/get-company.usecase.interface';
import { IUpdateCompanyUsecase } from '../../../useCases/Interfaces/company/update-company.usecase.interface';
import { IGetDashboardUsecase } from '../../../useCases/Interfaces/company/get-dashboard.usecase.interface';

@injectable()
export class CompanyController {
  constructor(
    @inject('IGetCompanyUsecase') private _getCompanyUsecase: IGetCompanyUsecase,
    @inject('IUpdateCompanyUsecase') private _updateCompanyUsecase: IUpdateCompanyUsecase,
    @inject('IGetDashboardUsecase') private _getDashboardUsecase: IGetDashboardUsecase
  ) {}

  async getCompany(req: Request, res: Response): Promise<void> {
    const accountId = req.user?.accountId as string;

    const response = await this._getCompanyUsecase.execute(accountId);

    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.COMPANY_FETCHED, response));
  }

  async updateProfile(req: Request, res: Response) {
    const accountId = req.user?.accountId;
    const { companyName } = req.body;
    await this._updateCompanyUsecase.execute(accountId as string, companyName);
    res.status(HTTP_STATUS.OK).json(commonResponse(true, SUCCESS_MESSAGES.COMPANY_UPDATED));
  }

  async getDashboard(req: Request, res: Response) {
    const accountId = req.user?.accountId;
    const response = await this._getDashboardUsecase.execute(accountId as string);
    res.status(HTTP_STATUS.OK).json(commonResponse(true, SUCCESS_MESSAGES.DASHBOARD_FETCHED, response));
  }
  
}
