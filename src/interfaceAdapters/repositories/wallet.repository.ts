import { IWalletRepository } from '../../domain/repositoryInterfaces/wallet-repository.interface';
import { IWalletModel, WalletModel } from '../../frameworks/database/models/wallet.model';
import { IWalletEnitity } from '../../domain/entities/wallet.entity';
import { walletMapper } from '../../frameworks/database/dtoMappers/dto.mapper';
import { BaseRepository } from './base-repository';

export class WalletRepository
  extends BaseRepository<IWalletModel, IWalletEnitity>
  implements IWalletRepository
{
  constructor() {
    super(WalletModel, walletMapper.toEntity, walletMapper.toModel);
  }
}
