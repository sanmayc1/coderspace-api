import { ISkillEntity } from '../entities/skill-entity';
import { IBaseRepository } from './base-repository.interface';

export interface ISkillRepository extends IBaseRepository<ISkillEntity> {
  findByTitle(title: string): Promise<ISkillEntity | null>;
  getAll(): Promise<ISkillEntity[]>;
}
