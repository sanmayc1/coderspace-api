import { inject, injectable } from "tsyringe";
import { IGetProblemUsecaseOutput } from "../../dtos/admin.dto.js";
import { IGetProblemUsecase } from "../../Interfaces/admin/problem-management/get-problem.usecase.interface.js";
import { IProblemRepository } from "../../../domain/repositoryInterfaces/problem-repository.interface.js";
import { CustomError } from "../../../domain/utils/custom-error.js";
import { ERROR_MESSAGES, HTTP_STATUS, Projection } from "../../../shared/constant.js";
import { getProblemUsecaseMapper } from "../../dtos/mappers/mappers.js";


@injectable()
export class GetProblemUsecase implements IGetProblemUsecase {
  constructor(
    @inject("IProblemRepository") private _problemRepository: IProblemRepository
  ) {}
  async execute(id: string): Promise<IGetProblemUsecaseOutput> {
    
    const relations = ["skillsIds"]

    const exists = await this._problemRepository.getProblem(id,{relations})

    if(!exists){
        throw new CustomError(HTTP_STATUS.BAD_REQUEST,ERROR_MESSAGES.PROBLEM_NOT_FOUND)
    }

    return getProblemUsecaseMapper.toResponse(exists)
  }
}
