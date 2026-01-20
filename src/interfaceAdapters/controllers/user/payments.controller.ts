import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { IGetAllPlansUseCase } from '../../../useCases/Interfaces/common/get-all-plans.usecase.interface';
import { commonResponse, HTTP_STATUS, SUCCESS_MESSAGES } from '../auth';
import { ICreateRazorpayOrderUseCase } from '../../../useCases/Interfaces/users/payments/create-razorpay-order.interface.usecase';
import { IVerifyPaymentUseCase } from '../../../useCases/Interfaces/users/payments/verify-payment.usecase.interface';
import { IMarkFailedPaymentUseCase } from '../../../useCases/Interfaces/users/payments/mark-failed-payment.usecase.interface';

@injectable()
export class PaymentsController {
  constructor(
    @inject('IGetAllPlansUseCase') private _getAllPlansUseCase: IGetAllPlansUseCase,
    @inject('ICreateRazorpayOrderUseCase')
    private _createRazorpayOrderUseCase: ICreateRazorpayOrderUseCase,
    @inject('IVerifyPaymentUseCase') private _verifyPaymentUseCase: IVerifyPaymentUseCase,
    @inject('IMarkFailedPaymentUseCase') private _markFailedPaymentUseCase: IMarkFailedPaymentUseCase
  ) {}

  async getAllPlans(req: Request, res: Response) {
    const plans = await this._getAllPlansUseCase.execute();
    res.status(HTTP_STATUS.OK).json(commonResponse(true, SUCCESS_MESSAGES.GET_ALL_PLANS, plans));
  }

  async createRazorpayOrder(req: Request, res: Response) {
    const { planId } = req.body;

    const order = await this._createRazorpayOrderUseCase.execute({
      accountId: req.user?.accountId as string,
      planId,
    });
    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.CREATE_RAZORPAY_ORDER, order));
  }

  async verifyPayment(req: Request, res: Response) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    await this._verifyPaymentUseCase.execute(razorpay_order_id, razorpay_payment_id, razorpay_signature,req.user?.accountId as string);
    res.status(HTTP_STATUS.OK).json(commonResponse(true, SUCCESS_MESSAGES.VERIFY_PAYMENT));
  }

  async markFailedPayment(req: Request, res: Response) {
    const { orderId } = req.body;
    await this._markFailedPaymentUseCase.execute(orderId);
    res.status(HTTP_STATUS.OK).json(commonResponse(true, SUCCESS_MESSAGES.MARK_FAILED_PAYMENT));
  }
}
