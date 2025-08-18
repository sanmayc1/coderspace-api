import { IUserModel } from "../../../frameworks/database/models/user.model.js";
import { IUserEntity } from "../../models/user.entity.js";


export interface IUserReopository{
    findByEmail(email:string):Promise<IUserModel | null>
    save(data: Partial <IUserEntity>):Promise<IUserModel>
    findByUsernmae(username:string):Promise<IUserModel|null>

}