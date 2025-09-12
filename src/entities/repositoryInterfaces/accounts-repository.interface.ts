import { IAccountsEntity } from "../models/accounts-entity.js";
import { IBaseRepository } from "./base-repository.interface.js";


export interface IAccountsRepository extends IBaseRepository<IAccountsEntity> {
    findByEmail(email:string):Promise<IAccountsEntity | null>
    setAccountVerified(email:string):Promise<void>
}
