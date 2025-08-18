import { Document, model, ObjectId } from "mongoose";
import { IWalletEnitity } from "../../../entities/models/wallet-Enitity.js";
import { WalletSchema  } from "../schema/wallet.schema.js";


export interface IWalletModel extends  Omit<IWalletEnitity,"_id "|"userId">,Document{
    _id:ObjectId
    userId:ObjectId
}

export const WalletModel = model("Wallet",WalletSchema)