import { Document, model, ObjectId, Types } from "mongoose";
import { ICompanyEntity } from "../../../domain/entities/company-entity.js";
import { companySchema } from "../schema/company.schema.js";




export interface ICompanyModel extends Omit<ICompanyEntity ,"_id"|"accountId">,Document{
    _id:ObjectId
    accountId:Types.ObjectId
}


export const CompanyModel = model("Company",companySchema)