import { IAccountsEntity } from "../../entities/models/accounts-entity.js";
import { RegisterUserRequestDto } from "../dtos/auth.dto.js";


export const accountDtoMapper = {
  toEntity(data: RegisterUserRequestDto):IAccountsEntity {
    return {
      name: data.name,
      email: data.email,
      password: data.password,
    };
  } 
};