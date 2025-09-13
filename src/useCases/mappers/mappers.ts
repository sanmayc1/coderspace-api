import { IAccountsEntity } from "../../entities/models/accounts-entity.js";
import { IUserEntity } from "../../entities/models/user.entity.js";
import { IAuthProviderUsecaseOutputDto, IAuthResponseDto, IGoogleAuthUsecaseInputDto } from "../dtos/auth.dto.js";

export const authUserUsecaseMapper = {
  toOutput(
    account: IAccountsEntity,
    user: IUserEntity
  ): IAuthResponseDto {
    return {
      accountId: account._id as string,
      email: account.email,
      profileComplete: user.isProfileComplete as boolean,
      profileUrl: account.profileUrl || "",
    };
  },
};

export const googleAuthUsecaseMapper ={
    toEntity(data:IGoogleAuthUsecaseInputDto):IAccountsEntity{
        return {
            email: data.emails[0].value as string ,
            name:data.displayName as string,
            authProvider:"google",
            profileUrl:data.photos&& data.photos[0].value,
            isVerified:true,
        }
    },
    

    
}