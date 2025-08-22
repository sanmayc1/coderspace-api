import { IUserEntity } from "../../entities/models/user.entity.js";
import { ILoginUserUsecaseOutput } from "../../entities/useCaseInterfaces/auth/login-user.usecase.interface.js";
import {
  UserLoginResponseDto,
  UserRegisterRequestDto,
} from "../dtos/auth.dto.js";

export const UserMapperController = {
  toEntity(data: UserRegisterRequestDto): Omit<IUserEntity, "_id"> {
    return {
      name: data.name,
      email: data.email,
      username: data.username,
      password: data.password,
    };
  },
  toLoginResponse(data: ILoginUserUsecaseOutput): UserLoginResponseDto {
    return {
      userId: data._id,
      email: data.email,
      isProfileComplete: data.isProfileComplete as boolean,
    };
  },
};
