import { IJwtPayload } from "../../domain/services/jwt-service.interface.ts";

declare global {
  namespace Express {
    interface User {
      accountId: string;
      role: string;
      isProfileComplete?: boolean;
      deviceId: string;
      exp?: number;
    }
  }
}
