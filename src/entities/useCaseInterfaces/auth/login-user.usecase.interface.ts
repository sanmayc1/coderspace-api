import { IAccountsEntity } from "../../models/accounts-entity.js";
import { ITokenEntity } from "../../models/token.entity.js";

export interface LoginUserResponse{
   accountId:string,
   email:string,
   profileComplete:boolean
}

export interface ILoginUserUsecaseOutput
  extends ITokenEntity{
  deviceId: string;
  response:LoginUserResponse
}

export interface ILoginUserUsecase {
  execute(data:Pick<IAccountsEntity , "email" | "password">): Promise<ILoginUserUsecaseOutput>;
}
