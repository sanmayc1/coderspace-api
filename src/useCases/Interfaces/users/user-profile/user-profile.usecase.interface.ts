import { IGetUserUsecaseOutputDto } from '../../../dtos/user.dto';

export interface IGetUserUsecase {
  execute(accountId: string): Promise<IGetUserUsecaseOutputDto>;
}
