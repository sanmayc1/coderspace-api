export interface ITokenRepository {
  tokenExists(token: string, deviceId: string): Promise<boolean>;
  deleteByTokenAndDeviceId(token: string, deviceId: string): Promise<void>;
  updateToken(token: string, deviceId: string): Promise<void>;
  saveToken(
    userId: string,
    deviceId: string,
    token: string,
    expiry: Date
  ): Promise<void>;

  deleteAllTokenByUserId(userId:string):Promise<void>
}
