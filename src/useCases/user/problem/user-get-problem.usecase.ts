import { inject, injectable } from "tsyringe";
import { IUserGetProblemUsecaseOutput } from "../../dtos/admin.dto.js";
import { IUserGetProblemUsecase } from "../../Interfaces/users/problem/user-get-problem.usecase.interface.js";
import { IProblemRepository } from "../../../domain/repositoryInterfaces/problem-repository.interface.js";
import { userGetProblemUsecaseMapper } from "../../dtos/mappers/mappers.js";
import { CustomError } from "../../../domain/utils/custom-error.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constant.js";

@injectable()
export class UserGetProblemUsecase implements IUserGetProblemUsecase {
  constructor(
    @inject("IProblemRepository") private _problemRepository: IProblemRepository
  ) {}
  async execute(id: string): Promise<IUserGetProblemUsecaseOutput> {
    const relations = ["skillsIds", "addedLanguagesId", "domainId"];

    const problem = await this._problemRepository.getProblem(id, { relations });

    if (!problem) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.PROBLEM_NOT_FOUND
      );
    }

    return userGetProblemUsecaseMapper.toResponse(problem);
  }
}
