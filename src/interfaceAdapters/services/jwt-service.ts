import { JwtPayload, SignOptions } from "jsonwebtoken";
import { IJwtService } from "../../entities/services/jwtService.interface.js";
import jwt from "jsonwebtoken";
import { config } from "../../shared/config.js";

export class JwtService implements IJwtService {
  private refreshSecret: string;
  private accessSecret: string;
  private accessExpireIn: string;
  private refreshExpireIn: string;
  constructor() {
    this.refreshSecret = config.jwt.refreshSecret as string;
    this.accessSecret = config.jwt.accessSecret as string;
    this.refreshExpireIn = config.jwt.refreshExpire as string;
    this.accessExpireIn = config.jwt.refreshExpire as string;
  }
  signAccess(payload: Record<string, string>): string {
    return jwt.sign(payload, this.accessSecret, {
      expiresIn: this.accessExpireIn,
    } as SignOptions);
  }

  signRefresh(payload: Record<string, string>): string {
    return jwt.sign(payload, this.refreshSecret, {
      expiresIn: this.refreshExpireIn,
    } as SignOptions);
  }

  verifyAccess(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, this.accessSecret) as JwtPayload;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  verifyRefresh(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, this.refreshSecret) as JwtPayload;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
