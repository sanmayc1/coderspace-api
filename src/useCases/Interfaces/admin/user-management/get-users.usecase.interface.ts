import { IGetUsersUsecaseOutputDto, IGetUsersUsecaseInputDto } from '../../../dtos/admin.dto';

export interface IGetUsersUsecase {
  execute(data: IGetUsersUsecaseInputDto): Promise<IGetUsersUsecaseOutputDto>;
}
