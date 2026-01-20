import { inject, injectable } from "tsyringe";
import { IGetContestUsecase } from "../../Interfaces/company/contests/get-contest.usecase.interface";
import { IContestRepository } from "../../../domain/repositoryInterfaces/contest-repository.interface";
import { CustomError } from "../../../domain/utils/custom-error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constant";
import { IGetContestUsecaseOutputDto } from "../../dtos/company.dto";
import { getContestUsecaseMapper } from "../../dtos/mappers/mappers";




@injectable()
export class GetContestUsecase implements IGetContestUsecase {
  constructor(
    @inject('IContestRepository')
    private _contestRepository: IContestRepository
  ) {}

  async execute(id: string): Promise<IGetContestUsecaseOutputDto> {
   const contest = await this._contestRepository.findById(id);
   if (!contest) {
    throw new CustomError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.CONTEST_NOT_FOUND);
   }

    return getContestUsecaseMapper.toResponse(contest);
    
  }
}