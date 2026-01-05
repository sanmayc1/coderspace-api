import { injectable } from 'tsyringe';
import { IDomainEntity } from '../../domain/entities/domain-entity';
import { IDomainRepository } from '../../domain/repositoryInterfaces/domain-respository.interface';
import { DomainModel, IDomainModel } from '../../frameworks/database/models/domain.model';
import { BaseRepository } from './base-repository';
import { domainRepositoryMapper } from '../../frameworks/database/dtoMappers/dto.mapper';

@injectable()
export class DomainRepository
  extends BaseRepository<IDomainModel, IDomainEntity>
  implements IDomainRepository
{
  constructor() {
    super(DomainModel, domainRepositoryMapper.toEntity, domainRepositoryMapper.toModel);
  }
  async getAll(): Promise<IDomainEntity[]> {
    return await DomainModel.find();
  }
  async findByTitle(title: string): Promise<IDomainEntity | null> {
    return await DomainModel.findOne({ title });
  }
}
