import { IUpdateUserProfileInputDto } from '../../../dtos/user.dto';

export interface IUpdateUserProfileUsecase {
  execute(data: IUpdateUserProfileInputDto): Promise<any>;
}
