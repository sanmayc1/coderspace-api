import {
  IGetCompanyContestUsecaseInputDto,
  IGetCompanyContestUsecaseOutputDto,
} from '../../../dtos/company.dto';

export interface IGetAllCompanyContestsUsecase {
  execute(
    accountId: string,
    query: IGetCompanyContestUsecaseInputDto
  ): Promise<IGetCompanyContestUsecaseOutputDto>;
}
