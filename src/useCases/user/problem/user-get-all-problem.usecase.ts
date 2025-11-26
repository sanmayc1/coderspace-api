import { inject, injectable } from "tsyringe";
import {
  IUserGetAllProblemsUsecaseInput,
  IUserGetAllProblemsUsecaseOutput,
} from "../../dtos/admin.dto.js";
import { IUserGetAllProblemsUsecase } from "../../Interfaces/users/problem/user-get-all-problems.usecase.interface.js";
import { IProblemRepository } from "../../../domain/repositoryInterfaces/problem-repository.interface.js";
import { GenericFilter, Projection, Sort } from "../../../shared/constant.js";
import { userGetAllProblemsUsecaseMapper } from "../../dtos/mappers/mappers.js";

@injectable()
export class UserGetAllProblemsUsecase implements IUserGetAllProblemsUsecase {
  constructor(
    @inject("IProblemRepository") private _problemRepository: IProblemRepository
  ) {}

  async execute(
    data: IUserGetAllProblemsUsecaseInput
  ): Promise<IUserGetAllProblemsUsecaseOutput> {
    const relations = ["skillsIds"];
    const projections: Projection = [
      "_id",
      "title",
      "problemNumber",
      "skillsIds",
      "difficulty",
      "view",
    ];
    const filter: GenericFilter = {
      title: { op: "contains", value: data.search || "" },
      view: { op: "eq", value: "public" },
    };
    const limit = 10;
    const skip = (data.page - 1) * limit;
    const sort: Sort = { problemNumber: "asc" };

    const doc = await this._problemRepository.getAllProblems({
      filter,
      limit,
      skip,
      projections,
      relations,
      sort,
    });
    const totalPages = Math.ceil(doc.total / limit);

    const problems = doc.problems.map((s) =>
      userGetAllProblemsUsecaseMapper.toResponse(s)
    );

    return {
      problems,
      totalPages,
      currentPage: data.page,
    };
  }
}
