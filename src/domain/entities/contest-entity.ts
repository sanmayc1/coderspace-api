import { IDomainEntity } from "./domain-entity.js";
import { ISkillEntity } from "./skill-entity.js";
import { IProblemEntity } from "./problem-entity.js";
import { TView } from "../../shared/constant.js";
import { IAccountsEntity } from "./accounts-entity.js";

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
  duration: number;
  view: TView;
  creatorId: string | IAccountsEntity;
  createdAt?: Date;
  updatedAt?: Date;
}

