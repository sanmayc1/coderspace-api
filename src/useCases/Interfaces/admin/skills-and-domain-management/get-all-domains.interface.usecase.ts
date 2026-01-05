import { IGetAllDomainsUsecaseOutput } from '../../../dtos/admin.dto';

export interface IGetAllDomainsUsecase {
  executes(): Promise<IGetAllDomainsUsecaseOutput>;
}
