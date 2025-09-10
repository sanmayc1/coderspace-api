import { IWalletEnitity } from "../models/wallet.entity.js";

export interface IWalletRepository {
  create(userId: string , userType: string): Promise<IWalletEnitity>;
}
