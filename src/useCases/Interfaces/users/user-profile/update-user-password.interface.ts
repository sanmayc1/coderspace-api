import { IUpdateUserPasswordInputDto } from '../../../dtos/user.dto';

export interface IUpdateUserPasswordUsecase {
  execute(data: IUpdateUserPasswordInputDto): Promise<any>;
}
