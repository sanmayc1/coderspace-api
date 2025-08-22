import { IJwtPayload } from "../models/jwt-payload.enitity.js";


export interface IJwtService {
  signAccess<T extends object>(payload: T): string;
  signRefresh<T extends object>(payload: T,expireIn?:string|number): string;
  verifyAccess(token: string): IJwtPayload | null;
  verifyRefresh(token: string): IJwtPayload | null;
}
