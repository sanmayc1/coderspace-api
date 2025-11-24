import { inject, injectable } from "tsyringe";
import { IProblemEntity } from "../../../domain/entities/problem-entity.js";
import { IProblemRepository } from "../../../domain/repositoryInterfaces/problem-repository.interface.js";
import { GenericFilter, Projection, Sort } from "../../../shared/constant.js";
import { PROBLEM_SORTING } from "../../../shared/utils/mongo-utils.js";
import {
  IGetAllProblemUsecaseInputDto,
  IGetAllProblemUsecaseOutputDto,
} from "../../dtos/admin.dto.js";
import { IGetAllProblemsUsecase } from "../../Interfaces/admin/problem-management/get-all-problem.usecase.interface.js";
import { getAllProblemsUsecaseMapper } from "../../dtos/mappers/mappers.js";

@injectable()
export class GetAllProblemsUsecase implements IGetAllProblemsUsecase {
  constructor(
    @inject("IProblemRepository") private _problemRepository: IProblemRepository
  ) {}
  async execute(
    data: IGetAllProblemUsecaseInputDto
  ): Promise<IGetAllProblemUsecaseOutputDto> {
    const sort: Sort = PROBLEM_SORTING[data.sortBy] || PROBLEM_SORTING.NEWEST;
    const filter: GenericFilter = data.search ? { title: { op: "contains", value: data.search } }:{} ;
    const projections: Projection = ["_id", "title", "problemNumber", "view"];
    const limit = 4;
    const skip = (data.page - 1) * limit;


    const docs = await this._problemRepository.getAllProblems({filter,sort,projections,skip,limit})
    const totalPages = Math.ceil(docs.total/limit)
    const response = getAllProblemsUsecaseMapper.toResponse(totalPages,data.page,docs.problems)
    return response
  }
}
