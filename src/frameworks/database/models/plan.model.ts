import { model, Types } from "mongoose";
import { planSchema } from "../schema/plan.schema";
import { IPlanEntity } from "../../../domain/entities/plan-entity";


export interface IPlanModel extends Omit<IPlanEntity, '_id'>, Document {
    _id: Types.ObjectId;
}



export const PlanModel = model('Plan',planSchema);