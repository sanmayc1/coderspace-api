import { TRole } from "../../shared/constant.js";
import { IUserEntity } from "./user.entity.js";



export interface IUserRegisterEntity extends Omit<IUserEntity , "password"|"_id"|"role"> {
    password:string,
    role:TRole,

}