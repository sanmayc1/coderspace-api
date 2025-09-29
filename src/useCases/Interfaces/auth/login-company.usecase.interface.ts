import { IAccountsEntity } from "../../../domain/entities/accounts-entity.js";
import { ILoginUsecaseOutputDto} from "../../dtos/auth.dto.js";


export interface ILoginCompanyUsecase {
  execute(data:Pick<IAccountsEntity , "email" | "password">): Promise<ILoginUsecaseOutputDto>;
}
