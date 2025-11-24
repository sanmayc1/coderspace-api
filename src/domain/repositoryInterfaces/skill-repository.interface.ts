
import { ISkillEntity } from "../entities/skill-entity.js";
import { IBaseRepository } from "./base-repository.interface.js";

export interface ISkillRepository extends IBaseRepository<ISkillEntity> {
  findByTitle(title: string): Promise<ISkillEntity|null>;
  getAll():Promise<ISkillEntity[]>
}
