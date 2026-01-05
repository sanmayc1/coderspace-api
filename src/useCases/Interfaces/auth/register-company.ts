import type { RegisterCompanyRequestDto } from '../../dtos/auth.dto';

export interface IRegisterCompanyUsecase {
  execute(data: RegisterCompanyRequestDto): Promise<string>;
}
