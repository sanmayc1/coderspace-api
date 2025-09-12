import type { RegisterUserRequestDto } from "../../../useCases/dtos/auth.dto.js";

export interface IRegisterUserUsecase {
  execute(data: RegisterUserRequestDto): Promise<string>;
}
