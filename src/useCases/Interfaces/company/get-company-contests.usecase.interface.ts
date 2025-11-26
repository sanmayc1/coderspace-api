import {
  IGetCompanyContestUsecaseInputDto,
  IGetCompanyContestUsecaseOutputDto,
} from "../../dtos/company.dto.js";

export interface IGetCompanyContestsUsecase {
  execute(
    accountId: string,
    query: IGetCompanyContestUsecaseInputDto
  ): Promise<IGetCompanyContestUsecaseOutputDto>;
}

