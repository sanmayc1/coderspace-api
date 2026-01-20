import { inject, injectable } from 'tsyringe';
import { IGetAllPaymentsUseCase } from '../../Interfaces/admin/payments/get-all-payments.usecase.interface';
import { IPaymentRepository } from '../../../domain/repositoryInterfaces/payment-repository.interface';
import { IUserRepository } from '../../../domain/repositoryInterfaces/user-repository.interface';
import { PAYMENT_SORTING, PROBLEM_SORTING } from '../../../shared/utils/mongo-utils';
import { GenericFilter, Projection, Sort } from '../../../shared/constant';
import { IGetAllPaymentsUsecaseOutputDto } from '../../dtos/admin.dto';
import { getAllPaymentsUsecaseMapper } from '../../dtos/mappers/mappers';

@injectable()
export class GetAllPaymentsUseCase implements IGetAllPaymentsUseCase {
  constructor(
    @inject('IPaymentRepository') private _paymentRepository: IPaymentRepository,
    @inject('IUserRepository') private _userRepository: IUserRepository
  ) {}

  async execute(
    page: number,
    limit: number,
    sort: string,
    search: string
  ): Promise<IGetAllPaymentsUsecaseOutputDto> {
    const sortby: Sort = PAYMENT_SORTING[sort] || PAYMENT_SORTING.NEWEST;
    const filter: GenericFilter = search
      ? {
          razorpayPaymentId: { op: 'contains', value: search },
          status: { op: 'in', value: ['success', 'failed'] },
        }
      : { status: { op: 'in', value: ['success', 'failed'] } };

    const projections: Projection = [
      'razorpayPaymentId',
      'amount',
      'status',
      'planId',
      'createdAt',
      'userId',
    ];
    const relations = ['userId', 'planId'];
    const skip = (page - 1) * limit;

    const { data, total } = await this._paymentRepository.getAllPayments({
      filter,
      sort: sortby,
      projections,
      relations,
      skip,
      limit,
    });

    const response = data.map((payment: any) => getAllPaymentsUsecaseMapper.toResponse(payment));

    return {
      data: response,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }
}
