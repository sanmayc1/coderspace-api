import type {
  UserRegisterRequestDto,
  UserRegisterResponseDto,
} from "../../../shared/dtos/auth.dto.js";

export interface IRegisterUserUsecase {
  execute(user: UserRegisterRequestDto): Promise<void>;
}
