import type {
  UserRegisterRequestDto,
  UserRegisterResponseDto,
} from "../../../shared/dtos/auth.dto.js";

export interface IUserResgisterUseCase {
  execute(user: UserRegisterRequestDto): Promise<void>;
}
