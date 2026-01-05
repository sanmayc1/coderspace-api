import { Document, model, Types } from 'mongoose';
import { IProblemEntity } from '../../../domain/entities/problem-entity';
import { IDomainEntity } from '../../../domain/entities/domain-entity';
import { ISkillEntity } from '../../../domain/entities/skill-entity';
import { problemSchema } from '../schema/problem.schema';
import { ILanguageEntity } from '../../../domain/entities/langauge-entity';

export interface IProblemModel
  extends
    Omit<IProblemEntity, '_id' | 'problemNumber' | 'domainId' | 'skillsIds' | 'addedLanguagesId'>,
    Document {
  _id: Types.ObjectId;
  domainId: Types.ObjectId | IDomainEntity;
  skillsIds: (Types.ObjectId | ISkillEntity)[];
  addedLanguagesId: (Types.ObjectId | ILanguageEntity)[];
  problemNumber: number;
}

export const ProblemModel = model<IProblemModel>('Problem', problemSchema);
