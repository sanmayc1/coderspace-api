import { IPaymentEntity } from '../entities/payment.entity';
import { IBaseRepository } from './base-repository.interface';
import { IMongoOptions } from './problem-repository.interface';

export interface IPaymentRepository extends IBaseRepository<IPaymentEntity> {
  updatePaymentByRazorpayOrderId(
    razorpayOrderId: string,
    data: Partial<IPaymentEntity>
  ): Promise<void>;
  findByRazorpayOrderId(razorpayOrderId: string): Promise<IPaymentEntity | null>;
  getAllPayments(data: IMongoOptions): Promise<{ data: IPaymentEntity[]; total: number }>;
}
