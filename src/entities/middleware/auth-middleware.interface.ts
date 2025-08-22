import { TRole } from "../../shared/constant.js";



export interface IAuthMiddleware {
    handle(role:TRole):Function
}