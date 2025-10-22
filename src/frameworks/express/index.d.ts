

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
