import { IAccountsEntity } from "../../../entities/models/accounts-entity.js";
import { ILoginCompanyUsecaseOutputDto} from "../../dtos/auth.dto.js";


export interface ILoginCompanyUsecase {
  execute(data:Pick<IAccountsEntity , "email" | "password">): Promise<ILoginCompanyUsecaseOutputDto>;
}
