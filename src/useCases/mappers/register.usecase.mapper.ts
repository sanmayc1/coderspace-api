import { IAccountsEntity } from "../../entities/models/accounts-entity.js";
import { IUserEntity } from "../../entities/models/user.entity.js";
import { TRole } from "../../shared/constant.js";
import { IAuthResponseDto } from "../dtos/auth.dto.js"; 


export const LoginUserUsecaseMapper = {
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
