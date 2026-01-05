import { ILanguageEntity } from '../../../domain/entities/langauge-entity';
import { Document, model, ObjectId } from 'mongoose';
import { langaugeSchema } from '../schema/language.schema';

export interface ILanguageModel extends Omit<ILanguageEntity, '_id'>, Document {
  _id: ObjectId;
}

export const LanguageModel = model('Language', langaugeSchema);
