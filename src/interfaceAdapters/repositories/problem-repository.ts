import { injectable } from "tsyringe";
import { IProblemEntity } from "../../domain/entities/problem-entity.js";
import { IProblemRepository } from "../../domain/repositoryInterfaces/problem-repository.interface.js";
import { IProblemModel, ProblemModel } from "../../frameworks/database/models/problem.model.js";
import { BaseRepository } from "./base-repository.js";
import { problemRepositoryMapper } from "../../frameworks/database/dtoMappers/dto.mapper.js";

@injectable()
export class ProblemRepository
  extends BaseRepository<IProblemModel, IProblemEntity>
  implements IProblemRepository {
   
    constructor(){
        super(ProblemModel,problemRepositoryMapper.toEntity,problemRepositoryMapper.toModel)
    }

  }
