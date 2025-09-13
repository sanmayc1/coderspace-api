import type { RegisterUserRequestDto } from "../../dtos/auth.dto.js";

export interface IRegisterUserUsecase {
  execute(data: RegisterUserRequestDto): Promise<string>;
}
