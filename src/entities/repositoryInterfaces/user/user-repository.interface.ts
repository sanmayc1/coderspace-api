import { IUserEntity } from "../../models/user.entity.js";


export interface IUserReopository{
    findByEmail(email:string):Promise<IUserEntity | null>
    save(data: Partial <IUserEntity>):Promise<IUserEntity>

}