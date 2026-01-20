import { inject, injectable } from 'tsyringe';
import { IVerifyPaymentUseCase } from '../../Interfaces/users/payments/verify-payment.usecase.interface';
import { IPaymentRepository } from '../../../domain/repositoryInterfaces/payment-repository.interface';

import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constant';
import { CustomError } from '../../../domain/utils/custom-error';
import { IPaymentService } from '../../../domain/services/payment-service.interface';
import { IUserRepository } from '../../../domain/repositoryInterfaces/user-repository.interface';
import { IPlanRepository } from '../../../domain/repositoryInterfaces/plan-repository.interface';

@injectable()
export class VerifyPaymentUseCase implements IVerifyPaymentUseCase {
  constructor(
    @inject('IPaymentRepository') private _paymentRepository: IPaymentRepository,
    @inject('IPaymentService') private _paymentService: IPaymentService,
    @inject('IUserRepository') private _userRepository: IUserRepository,
    @inject('IPlanRepository') private _planRepository: IPlanRepository
  ) {}
  async execute(
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string,
    accountId: string
  ): Promise<void> {
    const payment = await this._paymentRepository.findByRazorpayOrderId(razorpayOrderId);
    if (!payment) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.PAYMENT_NOT_FOUND);
    }

    const isVerified = await this._paymentService.verifyPayment(
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    );
    if (!isVerified) {
      await this._paymentRepository.updatePaymentByRazorpayOrderId(razorpayOrderId, {
        status: 'failed',
      });
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.PAYMENT_VERIFICATION_FAILED);
    }

    const user = await this._userRepository.findByAccountId(accountId);
    if (!user) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const plan = await this._planRepository.findById(payment.planId as string);
    if (!plan) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.PLAN_NOT_FOUND);
    }

    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + plan.durationInMonths);

    await this._userRepository.updateById(user._id as string, {
      subscription: {
        planId: payment.planId as string,
        startDate,
        endDate,
      },
    });

    await this._paymentRepository.updatePaymentByRazorpayOrderId(razorpayOrderId, {
      razorpayPaymentId,
      status: 'success',
    });
  }
}
