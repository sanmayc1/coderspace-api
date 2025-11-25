import { model, ObjectId, Types } from "mongoose";
import { ITestcaseEntity } from "../../../domain/entities/testcase-entity.js";
import { IProblemEntity } from "../../../domain/entities/problem-entity.js";
import { testcaseSchema } from "../schema/testcase.schema.js";




export interface ITestcaseModel extends Omit<ITestcaseEntity,"_id"|"problemId">,Document{
    _id:ObjectId
    problemId:Types.ObjectId | IProblemEntity
}


export const TestcaseModel = model<ITestcaseModel>("Testcase",testcaseSchema)