import { IDomainEntity } from './domain-entity';
import { ISkillEntity } from './skill-entity';
import { IProblemEntity } from './problem-entity';
import { TView } from '../../shared/constant';
import { IAccountsEntity } from './accounts-entity';
import { IProblemModel } from '../../frameworks/database/models/problem.model';

export interface IContestRewardEntity {
  rank: number;
  description: string;
}

export interface IContestEntity {
  _id?: string;
  title: string;
  description: string;
  domainId: string | IDomainEntity;
  skillsIds: (string | ISkillEntity)[];
  problemsIds: (string | IProblemEntity)[];
  rewards: IContestRewardEntity[];
  dateAndTime: Date;
  endDateAndTime: Date;
  duration: number;
  view: TView;
  creatorId: string | IAccountsEntity;
  createdAt?: Date;
  updatedAt?: Date;
}
