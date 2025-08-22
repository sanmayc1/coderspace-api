import { IWalletRepository } from "../../entities/repositoryInterfaces/wallet-repository.interface.js";
import {  WalletModel } from "../../frameworks/database/models/wallet.model.js";
import { IWalletEnitity } from "../../entities/models/wallet.Enitity.js";
import { walletMapper } from "../../frameworks/database/dto.mapper.js";


export class WalletRepository implements IWalletRepository {
  async create(userId: string ,userType:string): Promise<IWalletEnitity> {
    const wallet= await WalletModel.create({ userId,userType })
    return walletMapper.toEntity(wallet)
  }
}
