import { model, ObjectId } from 'mongoose';
import { IOtpEntity } from '../../../domain/entities/otp.entity';
import { otpSchema } from '../schema/otp.schema';

export interface IOtpModel extends Omit<IOtpEntity, '_id'> {
  _id: ObjectId;
}

export const OtpModel = model('Otp', otpSchema);
