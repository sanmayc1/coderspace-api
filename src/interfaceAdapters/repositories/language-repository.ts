import { injectable } from "tsyringe";
import { BaseRepository } from "./base-repository.js";
import { langaugeRepositoryMapper } from "../../frameworks/database/dtoMappers/dto.mapper.js";
import { ILanguageRepository } from "../../domain/repositoryInterfaces/language-repository.interface.js";
import { ILanguageModel, LanguageModel } from "../../frameworks/database/models/language.model.js";
import { ILanguageEntity } from "../../domain/entities/langauge-entity.js";

@injectable()
export class LanguageRepository
  extends BaseRepository<ILanguageModel, ILanguageEntity>
  implements ILanguageRepository
{
  constructor() {
    super(
      LanguageModel,
      langaugeRepositoryMapper.toEntity,
      langaugeRepositoryMapper.toModel
    );
  }

}
