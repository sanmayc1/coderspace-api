import { Document, model, ObjectId, Types } from 'mongoose';
import { ICompanyEntity } from '../../../domain/entities/company-entity';
import { companySchema } from '../schema/company.schema';

export interface ICompanyModel extends Omit<ICompanyEntity, '_id' | 'accountId'>, Document {
  _id: ObjectId;
  accountId: Types.ObjectId;
}

export const CompanyModel = model('Company', companySchema);
