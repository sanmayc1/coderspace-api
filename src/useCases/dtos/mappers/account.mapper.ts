import { IAccountsEntity } from '../../../domain/entities/accounts-entity';
import { RegisterCompanyRequestDto, RegisterUserRequestDto } from '../auth.dto';

export const accountDtoMapper = {
  toEntity(data: RegisterUserRequestDto | RegisterCompanyRequestDto): IAccountsEntity {
    return {
      name: data.name,
      email: data.email,
      password: data.password,
    };
  },
};
