


import { Document, model, ObjectId } from "mongoose";
import { ISkillEntity } from "../../../domain/entities/skill-entity.js";
import { skillSchema } from "../schema/skill.schema.js";






export interface ISkillModel extends Omit<ISkillEntity ,"_id">,Document {
    _id:ObjectId
}


export const SkillModel = model("Skill",skillSchema)