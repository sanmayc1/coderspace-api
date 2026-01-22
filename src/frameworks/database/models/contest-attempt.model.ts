import { model, Types } from 'mongoose';
import { IContestAttemptEntity } from '../../../domain/entities/contest-attempt-entity';
import { contestAttemptSchema } from '../schema/contest-attempt.schema';

export interface IContestAttemptModel
  extends Document, Omit<IContestAttemptEntity, '_id' | 'contestId' | 'userId'> {
    _id: Types.ObjectId;
    contestId: Types.ObjectId;
    userId: Types.ObjectId;
  }

export const ContestAttemptModel = model<IContestAttemptModel>('ContestAttempt', contestAttemptSchema);