import { IPaymentEntity } from '../../../domain/entities/payment.entity';
import { Document, model, Types } from 'mongoose';
import { paymentSchema } from '../schema/payment.schema';

export interface IPaymentModel extends Omit<IPaymentEntity, '_id' | 'planId' | 'userId'>, Document {
  _id: Types.ObjectId;
  planId: Types.ObjectId;
  userId: Types.ObjectId;
}


export const PaymentModel = model<IPaymentModel>('Payment',paymentSchema);
