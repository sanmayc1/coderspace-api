import { injectable } from 'tsyringe';
import { BaseRepository } from './base-repository';
import { skillRepositoryMapper } from '../../frameworks/database/dtoMappers/dto.mapper';
import { ISkillModel, SkillModel } from '../../frameworks/database/models/skill.model';
import { ISkillEntity } from '../../domain/entities/skill-entity';
import { ISkillRepository } from '../../domain/repositoryInterfaces/skill-repository.interface';

@injectable()
export class SkillRepository
  extends BaseRepository<ISkillModel, ISkillEntity>
  implements ISkillRepository
{
  constructor() {
    super(SkillModel, skillRepositoryMapper.toEntity, skillRepositoryMapper.toModel);
  }
  async getAll(): Promise<ISkillEntity[]> {
    return await SkillModel.find();
  }
  async findByTitle(title: string): Promise<ISkillEntity | null> {
    return await SkillModel.findOne({ title });
  }
}
