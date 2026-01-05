import { IWalletEnitity } from '../entities/wallet.entity';
import { IBaseRepository } from './base-repository.interface';

export interface IWalletRepository extends IBaseRepository<IWalletEnitity> {}
