import { IDomainEntity } from "../entities/domain-entity.js";
import { IBaseRepository } from "./base-repository.interface.js";

export interface IDomainRepository extends IBaseRepository<IDomainEntity> {
  findByTitle(title: string): Promise<IDomainEntity|null>;
}
