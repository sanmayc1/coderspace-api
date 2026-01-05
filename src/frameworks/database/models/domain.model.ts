import { Document, model, ObjectId } from 'mongoose';
import { IDomainEntity } from '../../../domain/entities/domain-entity';
import { domainSchema } from '../schema/domain.schema';

export interface IDomainModel extends Omit<IDomainEntity, '_id'>, Document {
  _id: ObjectId;
}

export const DomainModel = model('Domain', domainSchema);
