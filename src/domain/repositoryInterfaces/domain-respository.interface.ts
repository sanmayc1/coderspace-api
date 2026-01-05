import { IDomainEntity } from '../entities/domain-entity';
import { IBaseRepository } from './base-repository.interface';

export interface IDomainRepository extends IBaseRepository<IDomainEntity> {
  findByTitle(title: string): Promise<IDomainEntity | null>;
  getAll(): Promise<IDomainEntity[]>;
}
