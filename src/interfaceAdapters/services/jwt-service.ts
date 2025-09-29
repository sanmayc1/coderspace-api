import { SignOptions } from "jsonwebtoken";
import { IJwtService } from "../../domain/services/jwt-service.interface.js";
import jwt from "jsonwebtoken";
import { config } from "../../shared/config.js";
import { IJwtPayload } from "../../domain/entities/jwt-payload.enitity.js";

export class JwtService implements IJwtService {
  private refreshSecret: string;
  private accessSecret: string;
  private accessExpireIn: string;
  private refreshExpireIn: string;
  constructor() {
    this.refreshSecret = config.jwt.refreshSecret as string;
    this.accessSecret = config.jwt.accessSecret as string;
    this.refreshExpireIn = config.jwt.refreshExpire as string;
    this.accessExpireIn = config.jwt.accessExpire as string;
  }
  signAccess<T extends object>(payload:T): string {
    return jwt.sign(payload, this.accessSecret, {
      expiresIn: this.accessExpireIn,
    } as SignOptions);
  }

  signRefresh<T extends object>(payload: T,expireIn:string|number = this.refreshExpireIn): string {
    return jwt.sign(payload, this.refreshSecret, {
      expiresIn: expireIn,
    } as SignOptions);
  }

  verifyAccess(token: string): IJwtPayload | null {
    try {
      return jwt.verify(token, this.accessSecret) as IJwtPayload;
    } catch (error) {
      return null;
    }
  }

  verifyRefresh(token: string): IJwtPayload | null {
    try {
      return jwt.verify(token, this.refreshSecret) as IJwtPayload;
    } catch (error) {
      return null;
    }
  }
}
