import { TAuthProviders, TRole } from "../../shared/constant.js"


export interface IAccountsEntity {
    email:string
    password:string
    role:TRole
    isVerified:boolean
    authProvider:TAuthProviders
}