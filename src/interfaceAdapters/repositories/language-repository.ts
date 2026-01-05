import { injectable } from 'tsyringe';
import { BaseRepository } from './base-repository';
import { langaugeRepositoryMapper } from '../../frameworks/database/dtoMappers/dto.mapper';
import { ILanguageRepository } from '../../domain/repositoryInterfaces/language-repository.interface';
import { ILanguageModel, LanguageModel } from '../../frameworks/database/models/language.model';
import { ILanguageEntity } from '../../domain/entities/langauge-entity';

@injectable()
export class LanguageRepository
  extends BaseRepository<ILanguageModel, ILanguageEntity>
  implements ILanguageRepository
{
  constructor() {
    super(LanguageModel, langaugeRepositoryMapper.toEntity, langaugeRepositoryMapper.toModel);
  }
}
