import type { RegisterCompanyRequestDto } from "../../dtos/auth.dto.js";

export interface IRegisterCompanyUsecase {
  execute(data: RegisterCompanyRequestDto): Promise<string>;
}
