import { IWalletRepository } from "../../entities/repositoryInterfaces/wallet-repository.interface.js";
import {  IWalletModel, WalletModel } from "../../frameworks/database/models/wallet.model.js";
import { IWalletEnitity } from "../../entities/models/wallet.entity.js";
import { walletMapper } from "../../frameworks/database/dtoMappers/dto.mapper.js";
import { BaseRepository } from "./base-repository.js";


export class WalletRepository extends BaseRepository<IWalletModel,IWalletEnitity> implements IWalletRepository {

  constructor(){
    super(WalletModel,walletMapper.toEntity,walletMapper.toModel)
  }

}
