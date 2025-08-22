import { JwtPayload } from "jsonwebtoken";

export interface IJwtService {
  signAccess(payload:Record<string,string>): string;
  signRefresh(payload:Record<string,string>): string;
  verifyAccess(token: string): JwtPayload | null;
  verifyRefresh(token: string): JwtPayload | null;
}
