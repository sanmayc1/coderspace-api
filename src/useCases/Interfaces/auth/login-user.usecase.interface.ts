import { IAccountsEntity } from "../../../domain/entities/accounts-entity.js";
import { ILoginUsecaseOutputDto} from "../../dtos/auth.dto.js";


export interface ILoginUserUsecase {
  execute(data:Pick<IAccountsEntity , "email" | "password">): Promise<ILoginUsecaseOutputDto>;
}
