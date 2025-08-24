import { ITokenEntity } from "../../models/token.entity.js";
import { IUserEntity } from "../../models/user.entity.js";

export interface ILoginUserUsecaseOutput
  extends ITokenEntity,
    Pick<IUserEntity, "_id" | "email" | "isProfileComplete"> {
  deviceId: string;
}

export interface ILoginUserUsecase {
  execute(email: string, password: string): Promise<ILoginUserUsecaseOutput>;
}
