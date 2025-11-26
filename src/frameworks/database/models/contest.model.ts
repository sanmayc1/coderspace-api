import { Document, model, Types } from "mongoose";
import {
  IContestEntity,
  IContestRewardEntity,
} from "../../../domain/entities/contest-entity.js";
import { IDomainEntity } from "../../../domain/entities/domain-entity.js";
import { ISkillEntity } from "../../../domain/entities/skill-entity.js";
import { IProblemEntity } from "../../../domain/entities/problem-entity.js";
import { contestSchema } from "../schema/contest.schema.js";
import { IAccountsEntity } from "../../../domain/entities/accounts-entity.js";

export interface IContestModel
  extends Omit<
      IContestEntity,
      "_id" | "domainId" | "skillsIds" | "problemsIds" | "rewards" | "creatorId"
    >,
    Document {
  _id: Types.ObjectId;
  domainId: Types.ObjectId | IDomainEntity;
  skillsIds: (Types.ObjectId | ISkillEntity)[];
  problemsIds: (Types.ObjectId | IProblemEntity)[];
  rewards: IContestRewardEntity[];
  creatorId: Types.ObjectId | IAccountsEntity;
}

export const ContestModel = model<IContestModel>("Contest", contestSchema);

