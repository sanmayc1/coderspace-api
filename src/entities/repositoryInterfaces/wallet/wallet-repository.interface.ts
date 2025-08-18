import { ObjectId } from "mongoose";
import { IWalletModel } from "../../../frameworks/database/models/wallet.model.js";



export interface IWalletRepository {
    create(userId:string|ObjectId):Promise<IWalletModel>
}