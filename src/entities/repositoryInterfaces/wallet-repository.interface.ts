import { IWalletEnitity } from "../models/wallet.Enitity.js";

export interface IWalletRepository {
  create(userId: string , userType: string): Promise<IWalletEnitity>;
}
