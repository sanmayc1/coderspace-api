import { TLanguages, TStatus } from '../../shared/constant';
import { IProblemEntity } from './problem-entity';
import { IUserEntity } from './user.entity';

export interface ISubmitProblemEntity {
  _id: string;
  userId: string | IUserEntity;
  problemId: string | IProblemEntity;
  solution: string;
  language: TLanguages;
  status: TStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
