import { IAccountsEntity } from '../entities/accounts-entity';
import { IBaseRepository } from './base-repository.interface';

export interface IAccountsRepository extends IBaseRepository<IAccountsEntity> {
  findByEmail(email: string): Promise<IAccountsEntity | null>;
  setAccountVerified(email: string): Promise<void>;
}
