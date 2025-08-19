import type { UserRegisterRequestDto } from "../../../interfaceAdapters/dtos/auth.dto.js";

export interface IRegisterUserUsecase {
  execute(user: UserRegisterRequestDto): Promise<string>;
}
