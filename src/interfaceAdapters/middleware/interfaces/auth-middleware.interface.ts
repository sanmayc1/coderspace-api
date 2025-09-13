import { NextFunction, Request, Response } from "express";
import { TRole } from "../../../shared/constant.js";



export interface IAuthMiddleware {
    handle(role:TRole):(req: Request, res: Response, next: NextFunction) => Promise<void>
}