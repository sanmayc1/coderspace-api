import { IAccountsEntity } from "../../../domain/entities/accounts-entity.js";
import { RegisterCompanyRequestDto, RegisterUserRequestDto } from "../auth.dto.js";


export const accountDtoMapper = {
  toEntity(data: RegisterUserRequestDto | RegisterCompanyRequestDto):IAccountsEntity {
    return {
      name: data.name,
      email: data.email,
      password: data.password,
    };
  } 
};