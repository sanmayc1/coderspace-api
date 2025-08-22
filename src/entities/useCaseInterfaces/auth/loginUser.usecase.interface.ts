import { ITokenEntity } from "../../models/token.entity.js";

export interface ILoginUserUsecase {
  execute(email: string, password: string): Promise<ITokenEntity>;
}
