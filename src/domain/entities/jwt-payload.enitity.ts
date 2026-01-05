export interface IJwtPayload {
  accountId: string;
  role: string;
  isProfileComplete?: boolean;
  deviceId: string;
  exp?: number;
}
