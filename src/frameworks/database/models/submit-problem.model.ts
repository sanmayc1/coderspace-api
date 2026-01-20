import { model, Types } from 'mongoose';
import { ISubmitProblemEntity } from '../../../domain/entities/submit-problem.entity';
import { submitProblemSchema } from '../schema/submit-problem.schema';

export interface ISubmitProblemModel
  extends Omit<ISubmitProblemEntity, '_id' | 'userId' | 'problemId'>, Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  problemId: Types.ObjectId;
}

export const SubmitProblemModel = model<ISubmitProblemModel>('SubmitProblem', submitProblemSchema);
