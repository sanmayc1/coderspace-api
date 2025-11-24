import { ILanguageEntity } from "../../../domain/entities/langauge-entity.js";
import { accountsSchema } from "../schema/account.schema.js";
import {Document, model, ObjectId} from 'mongoose'


export interface ILanguageModel extends Omit<ILanguageEntity ,'_id'> ,Document{
  _id:ObjectId
}

export const AccountsModel = model("Account",accountsSchema)