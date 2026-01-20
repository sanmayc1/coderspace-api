import { inject, injectable } from 'tsyringe';
import { IGetAllPlansUseCase } from '../../../useCases/Interfaces/common/get-all-plans.usecase.interface';
import { IEditPlanUseCase } from '../../../useCases/Interfaces/admin/payments/edit-plan.usecase.interface';
import { IGetAllPaymentsUseCase } from '../../../useCases/Interfaces/admin/payments/get-all-payments.usecase.interface';
import { Request, Response } from 'express';
import { commonResponse, HTTP_STATUS, SUCCESS_MESSAGES } from '../auth';

@injectable()
export class PaymentsManagementController {
  constructor(
    @inject('IGetAllPlansUseCase') private _getAllPlansUseCase: IGetAllPlansUseCase,
    @inject('IEditPlanUseCase') private _editPlanUseCase: IEditPlanUseCase,
    @inject('IGetAllPaymentsUseCase') private _getAllPaymentsUseCase: IGetAllPaymentsUseCase
  ) {}

  async getAllPlans(req: Request, res: Response) {
    const plans = await this._getAllPlansUseCase.execute();
    res.status(HTTP_STATUS.OK).json(commonResponse(true, SUCCESS_MESSAGES.GET_ALL_PLANS, plans));
  }

  async editPlan(req: Request, res: Response) {
    const data = req.body;
    await this._editPlanUseCase.execute(data);
    res.status(HTTP_STATUS.OK).json(commonResponse(true, SUCCESS_MESSAGES.UPDATED));
  }

  async getAllPayments(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sort = req.query.sort as string;
    const search = req.query.search as string;

    const result = await this._getAllPaymentsUseCase.execute(page, limit, sort, search);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Payments fetched successfully',
      ...result,
    });
  }
}
