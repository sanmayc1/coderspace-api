import { IAccountsEntity } from "../../../entities/models/accounts-entity.js";
import { ILoginUserUsecaseOutputDto} from "../../dtos/auth.dto.js";


export interface ILoginUserUsecase {
  execute(data:Pick<IAccountsEntity , "email" | "password">): Promise<ILoginUserUsecaseOutputDto>;
}
