import { injectable } from 'tsyringe';
import { IPaymentRepository } from '../../domain/repositoryInterfaces/payment-repository.interface';
import { BaseRepository } from './base-repository';
import { IPaymentModel, PaymentModel } from '../../frameworks/database/models/payment.model';
import { IPaymentEntity } from '../../domain/entities/payment.entity';
import { paymentRepositoryMapper } from '../../frameworks/database/dtoMappers/dto.mapper';
import { IMongoOptions } from '../../domain/repositoryInterfaces/problem-repository.interface';
import {
  convertToMongoFilter,
  convertToMongoProjection,
  convertToMongoSort,
} from '../../shared/utils/mongo-utils';

@injectable()
export class PaymentRepository
  extends BaseRepository<IPaymentModel, IPaymentEntity>
  implements IPaymentRepository
{
  constructor() {
    super(PaymentModel, paymentRepositoryMapper.toEntity, paymentRepositoryMapper.toModel);
  }
  async findByRazorpayOrderId(razorpayOrderId: string): Promise<IPaymentEntity | null> {
    const doc = await PaymentModel.findOne({ razorpayOrderId });
    return doc ? paymentRepositoryMapper.toEntity(doc) : null;
  }
  async updatePaymentByRazorpayOrderId(
    razorpayOrderId: string,
    data: Partial<IPaymentEntity>
  ): Promise<void> {
    await PaymentModel.updateOne({ razorpayOrderId }, data);
  }

  async getAllPayments(data: IMongoOptions): Promise<{ data: IPaymentEntity[]; total: number }> {
    const filter = data.filter ? convertToMongoFilter(data.filter) : {};
    const projection = data.projections ? convertToMongoProjection(data.projections) : {};
    const relations = data.relations ? data.relations.join(' ') : '';
    const sort = data.sort ? convertToMongoSort(data.sort) : {};
    const skip = data.skip ?? 0;

    const [docs, total] = await Promise.all([
      PaymentModel.find(filter, projection)
        .populate(relations)
        .sort(sort)
        .skip(skip)
        .limit(data.limit)
        .lean(),
      PaymentModel.countDocuments(filter),
    ]);
  
    return { data: docs.map((doc) => paymentRepositoryMapper.toEntity(doc as any)), total };
  }
}
