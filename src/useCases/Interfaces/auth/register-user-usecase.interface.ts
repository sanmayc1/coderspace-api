import type { RegisterUserRequestDto } from '../../dtos/auth.dto';

export interface IRegisterUserUsecase {
  execute(data: RegisterUserRequestDto): Promise<string>;
}
