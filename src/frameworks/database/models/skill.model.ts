import { Document, model, ObjectId } from 'mongoose';
import { ISkillEntity } from '../../../domain/entities/skill-entity';
import { skillSchema } from '../schema/skill.schema';

export interface ISkillModel extends Omit<ISkillEntity, '_id'>, Document {
  _id: ObjectId;
}

export const SkillModel = model('Skill', skillSchema);
