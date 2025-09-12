import { IAccountsEntity } from "../../entities/models/accounts-entity.js";
import { IAccountsRepository } from "../../entities/repositoryInterfaces/accounts-repository.interface.js";
import { accountRepositoryMapper } from "../../frameworks/database/dtoMappers/dto.mapper.js";
import { AccountsModel, IAccountsModel } from "../../frameworks/database/models/account.model .js";
import { BaseRepository } from "./base-repository.js";

export class AccountRepository
  extends BaseRepository<IAccountsModel, IAccountsEntity>
  implements IAccountsRepository
{
  constructor(){
    super(AccountsModel,accountRepositoryMapper.toEntity,accountRepositoryMapper.toModel)
  }  
    async setAccountVerified(email: string): Promise<void> {
        await AccountsModel.findOneAndUpdate({email},{isVerified:true})
    }
  async findByEmail(email: string): Promise<IAccountsEntity |null> {
     const doc =  await AccountsModel.findOne({email})
     return doc ?  accountRepositoryMapper.toEntity(doc):null
  }
}
