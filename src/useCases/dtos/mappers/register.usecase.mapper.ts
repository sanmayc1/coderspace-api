import { IAccountsEntity } from "../../../domain/entities/accounts-entity.js";
import { IUserEntity } from "../../../domain/entities/user.entity.js";
import { TRole } from "../../../shared/constant.js";
import { IAuthResponseDto } from "../auth.dto.js"; 


export const LoginUsecaseMapper = {
  toResponse(account:IAccountsEntity,user?:IUserEntity): IAuthResponseDto {
    return {
      accountId: account._id as string,
      email:account.email,
      profileComplete: user?.isProfileComplete as boolean,
      profileUrl:account.profileUrl || "",
      role:account.role as TRole
    };
  },
};

