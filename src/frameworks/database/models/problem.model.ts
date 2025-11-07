import { Document, model, Types } from "mongoose";
import { IProblemEntity } from "../../../domain/entities/problem-entity.js";
import { IDomainEntity } from "../../../domain/entities/domain-entity.js";
import { ISkillEntity } from "../../../domain/entities/skill-entity.js";
import { problemSchema } from "../schema/problem.schema.js";

export interface IProblemModel
  extends Omit<
      IProblemEntity,
      "_id" | "problemNumber" | "domainId" | "skillsIds"
    >,
    Document {
  _id: Types.ObjectId;
  domainId: Types.ObjectId | IDomainEntity;
  skillsIds:(Types.ObjectId | ISkillEntity)[];
}


export const ProblemModel =  model<IProblemModel>("Problem",problemSchema)