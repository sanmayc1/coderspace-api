import { IAccountsEntity } from '../../domain/entities/accounts-entity';
import { IAccountsRepository } from '../../domain/repositoryInterfaces/accounts-repository.interface';
import { accountRepositoryMapper } from '../../frameworks/database/dtoMappers/dto.mapper';
import { AccountsModel, IAccountsModel } from '../../frameworks/database/models/account.model ';
import { BaseRepository } from './base-repository';

export class AccountRepository
  extends BaseRepository<IAccountsModel, IAccountsEntity>
  implements IAccountsRepository
{
  constructor() {
    super(AccountsModel, accountRepositoryMapper.toEntity, accountRepositoryMapper.toModel);
  }
  async setAccountVerified(email: string): Promise<void> {
    await AccountsModel.findOneAndUpdate({ email }, { isVerified: true });
  }
  async findByEmail(email: string): Promise<IAccountsEntity | null> {
    const doc = await AccountsModel.findOne({ email });
    return doc ? accountRepositoryMapper.toEntity(doc) : null;
  }
}
