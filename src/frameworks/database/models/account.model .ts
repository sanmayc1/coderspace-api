import { IAccountsEntity } from "../../../domain/entities/accounts-entity.js";
import { accountsSchema } from "../schema/account.schema.js";
import {Document, model, ObjectId} from 'mongoose'


export interface IAccountsModel extends Omit<IAccountsEntity ,'_id'> ,Document{
  _id:ObjectId
}

export const AccountsModel = model("Account",accountsSchema)