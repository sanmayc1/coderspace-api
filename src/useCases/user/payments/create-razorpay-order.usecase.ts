import { inject, injectable } from 'tsyringe';
import { ICreateRazorpayOrderUseCase } from '../../Interfaces/users/payments/create-razorpay-order.interface.usecase';
import {
  ICreateRazorpayOrderUsecaseInputDto,
  ICreateRazorpayOrderUsecaseOutputDto,
} from '../../dtos/user.dto';
import { IPaymentService } from '../../../domain/services/payment-service.interface';
import { CustomError } from '../../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constant';
import { IPlanRepository } from '../../../domain/repositoryInterfaces/plan-repository.interface';
import { IUserRepository } from '../../../domain/repositoryInterfaces/user-repository.interface';
import { IAccountsRepository } from '../../../domain/repositoryInterfaces/accounts-repository.interface';
import { IPaymentRepository } from '../../../domain/repositoryInterfaces/payment-repository.interface';

@injectable()
export class CreateRazorpayOrderUseCase implements ICreateRazorpayOrderUseCase {
  constructor(
    @inject('IPaymentService') private _paymentService: IPaymentService,
    @inject('IPlanRepository') private _planRepository: IPlanRepository,
    @inject('IAccountRepository')
    private _accountRepository: IAccountsRepository,
    @inject('IPaymentRepository')
    private _paymentRepository: IPaymentRepository,
    @inject('IUserRepository')
    private _userRepository: IUserRepository
  ) {}
  async execute(
    data: ICreateRazorpayOrderUsecaseInputDto
  ): Promise<ICreateRazorpayOrderUsecaseOutputDto> {
    const plan = await this._planRepository.findById(data.planId);
    if (!plan) {
      throw new CustomError(HTTP_STATUS.OK, ERROR_MESSAGES.PLAN_NOT_FOUND);
    }

    const account = await this._accountRepository.findById(data.accountId);

    if (!account) {
      throw new CustomError(HTTP_STATUS.OK, ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const user = await this._userRepository.findByAccountId(data.accountId);

    if (user?.subscription) {
      throw new CustomError(HTTP_STATUS.OK, ERROR_MESSAGES.SUBSCRIPTION_ALREADY_EXISTS);
    }

    const order = await this._paymentService.createRazorpayOrder(plan.price);

    await this._paymentRepository.create({
      razorpayOrderId: order.id,
      amount: plan.price,
      currency: order.currency,
      userId: account._id,
      planId: data.planId,
    });

    return {
      orderId: order.id,
      amount: String(plan.price),
      currency: order.currency,
      name: account.name,
      email: account.email,
    };
  }
}
