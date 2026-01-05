import {
  IGetCompanyContestUsecaseInputDto,
  IGetCompanyContestUsecaseOutputDto,
} from '../../dtos/company.dto';

export interface IGetCompanyContestsUsecase {
  execute(
    accountId: string,
    query: IGetCompanyContestUsecaseInputDto
  ): Promise<IGetCompanyContestUsecaseOutputDto>;
}
