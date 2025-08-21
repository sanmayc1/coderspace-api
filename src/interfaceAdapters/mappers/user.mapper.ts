import { IUserEntity } from "../../entities/models/user.entity.js";
import { UserRegisterRequestDto } from "../dtos/auth.dto.js";

export const UserMapperController = {
  toEntity(data: UserRegisterRequestDto): Omit<IUserEntity, "_id"> {
    return {
      name: data.name,
      email: data.email,
      username: data.username,
      password: data.password,
    };
  },
};
