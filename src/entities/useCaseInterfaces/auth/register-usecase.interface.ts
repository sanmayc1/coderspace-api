import type {
  UserRegisterRequestDto,
  UserRegisterResponseDto,
} from "../../../interfaceAdapters/dtos/auth.dto.js";

export interface IRegisterUserUsecase {
  execute(user: UserRegisterRequestDto): Promise<void>;
}
