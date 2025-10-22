import { ICompanyEntity } from "../entities/company-entity.js";
import { IBaseRepository } from "./base-repository.interface.js";

export interface ICompanyRepository extends IBaseRepository<ICompanyEntity> {
  findByGstin(gstin: string): Promise<ICompanyEntity | null>;
  findByAccountId(accountId:string):Promise<ICompanyEntity|null>
}
