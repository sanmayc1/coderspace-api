import { ICompanyEntity } from '../entities/company-entity';
import { IBaseRepository } from './base-repository.interface';

export interface ICompanyRepository extends IBaseRepository<ICompanyEntity> {
  findByGstin(gstin: string): Promise<ICompanyEntity | null>;
  findByAccountId(accountId: string): Promise<ICompanyEntity | null>;
}
