import { IUpdateUserUsecaseInputDto } from '../../../dtos/admin.dto';

export interface IUpdateUserUsecase {
  execute(data: IUpdateUserUsecaseInputDto): Promise<void>;
}
