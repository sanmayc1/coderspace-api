import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { commonResponse, HTTP_STATUS, SUCCESS_MESSAGES } from '../auth/index';
import { IGetAdminDashboardUsecase } from '../../../useCases/Interfaces/admin/get-dashboard.usecase.interface';

@injectable()
export class AdminDashboardController {
  constructor(
    @inject('IGetAdminDashboardUsecase') private _getAdminDashboardUsecase: IGetAdminDashboardUsecase
  ) {}

  async getDashboardStats(req: Request, res: Response) {
    const response = await this._getAdminDashboardUsecase.execute();
    res.status(HTTP_STATUS.OK).json(commonResponse(true, SUCCESS_MESSAGES.DASHBOARD_FETCHED, response));
  }
}
