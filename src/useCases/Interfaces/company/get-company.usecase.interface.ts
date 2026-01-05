import { IGetCompanyUsecaseOutputDto } from '../../dtos/company.dto';

export interface IGetCompanyUsecase {
  execute(accountId: string): Promise<IGetCompanyUsecaseOutputDto>;
}
