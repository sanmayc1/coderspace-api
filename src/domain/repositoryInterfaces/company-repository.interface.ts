import { ICompanyEntity } from '../entities/company-entity';
import { IBaseRepository } from './base-repository.interface';
import { IMongoOptions } from './problem-repository.interface';

export interface ICompanyRepository extends IBaseRepository<ICompanyEntity> {
  findByGstin(gstin: string): Promise<ICompanyEntity | null>;
  findByAccountId(accountId: string): Promise<ICompanyEntity | null>;
  getAllCompanies(data:IMongoOptions):Promise<{companies:any[] | [] , count:number}>
}
