import { ObjectId } from "mongoose";
import { IWalletRepository } from "../../../entities/repositoryInterfaces/wallet/wallet-repository.interface.js";
import { IWalletModel, WalletModel } from "../../../frameworks/database/models/wallet.model.js";


export class WalletRepository implements IWalletRepository {
  async create(userId: string | ObjectId): Promise<IWalletModel> {
    return await WalletModel.create({ userId });
  }
}
