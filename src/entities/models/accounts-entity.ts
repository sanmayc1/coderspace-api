import { TAuthProviders, TRole } from "../../shared/constant.js"


export interface IAccountsEntity {
    _id?:string
    email:string
    password?:string
    role?:TRole
    isVerified?:boolean
    authProvider?:TAuthProviders
    profileUrl?:string
    name:string
}