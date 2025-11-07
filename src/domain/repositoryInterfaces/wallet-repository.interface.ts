import { IWalletEnitity } from "../entities/wallet.entity.js";
import { IBaseRepository } from "./base-repository.interface.js";

export interface IWalletRepository extends IBaseRepository<IWalletEnitity> {
    
}
