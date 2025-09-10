import type { UserRegisterRequestDto } from "../../../useCases/auth/dtos/auth.dto.js";

export interface IRegisterUserUsecase {
  execute(data: UserRegisterRequestDto): Promise<string>;
}
