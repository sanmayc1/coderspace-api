import { injectable } from "tsyringe";
import { IProblemEntity } from "../../domain/entities/problem-entity.js";
import {
  IGetAllProblems,
  IGetAllProblemsInput,
  IProblemRepository,
} from "../../domain/repositoryInterfaces/problem-repository.interface.js";
import {
  IProblemModel,
  ProblemModel,
} from "../../frameworks/database/models/problem.model.js";
import { BaseRepository } from "./base-repository.js";
import { problemRepositoryMapper } from "../../frameworks/database/dtoMappers/dto.mapper.js";
import {
  convertToMongoFilter,
  convertToMongoProjection,
  convertToMongoSort,
} from "../../shared/utils/mongo-utils.js";

@injectable()
export class ProblemRepository
  extends BaseRepository<IProblemModel, IProblemEntity>
  implements IProblemRepository
{
  constructor() {
    super(
      ProblemModel,
      problemRepositoryMapper.toEntity,
      problemRepositoryMapper.toModel
    );
  }
  async addLanguage(id: string, languageId: string): Promise<void> {
    await ProblemModel.findByIdAndUpdate(id, {
      $push: { addedLanguagesId: languageId },
    });
  }
  async getAllProblems(data: IGetAllProblemsInput): Promise<IGetAllProblems> {
    const filter = data.filter ? convertToMongoFilter(data.filter) : {};
    const projection = data.projections
      ? convertToMongoProjection(data.projections)
      : {};
    const sort = data.sort ? convertToMongoSort(data.sort) : {};
    const relations = data.relations ? data.relations.join(" ") : ""
    const skip = data.skip ?? 0;

    const [docs, total] = await Promise.all([
      ProblemModel.find(filter, projection).populate(relations)
        .sort(sort)
        .skip(skip)
        .limit(data.limit)
        .lean(),
      ProblemModel.countDocuments(filter),
    ]);

    return {
      problems: docs.map(problemRepositoryMapper.toEntity),
      total,
    };
  }
  async findProblemCount(): Promise<number> {
    return await ProblemModel.countDocuments();
  }
}
