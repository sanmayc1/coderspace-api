import { IAccountsEntity } from "../../entities/models/accounts-entity.js";
import { RegisterCompanyRequestDto, RegisterUserRequestDto } from "../dtos/auth.dto.js";


export const accountDtoMapper = {
  toEntity(data: RegisterUserRequestDto | RegisterCompanyRequestDto):IAccountsEntity {
    return {
      name: data.name,
      email: data.email,
      password: data.password,
    };
  } 
};