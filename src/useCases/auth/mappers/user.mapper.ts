import { IUserRegisterEntity } from "../../../entities/models/user-register-entity.js";
import { IUserEntity } from "../../../entities/models/user.entity.js";
import { ILoginUserUsecaseOutput } from "../../../entities/useCaseInterfaces/auth/login-user.usecase.interface.js";
import {
  UserLoginResponseDto,
  UserRegisterRequestDto,
} from "../dtos/auth.dto.js";

export const UserMapper = {
  toEntity(data: UserRegisterRequestDto):IUserRegisterEntity {
    return {
      name: data.name,
      email: data.email,
      username: data.username,
      password: data.password,
      role: data.role
    };
  } ,
  toLoginResponse(data: ILoginUserUsecaseOutput): UserLoginResponseDto {
    return {
      userId: data._id,
      email: data.email,
      isProfileComplete: data.isProfileComplete as boolean,
    };
  },
};
