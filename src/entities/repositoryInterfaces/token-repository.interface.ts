export interface ITokenRepository {
  tokenExists(token: string, deviceId: string): Promise<boolean>;
  deleteByTokenAndDeviceId(token: string, deviceId: string): Promise<void>;
  updateToken(token: string, deviceId: string): Promise<void>;
  saveToken(
    accounId: string,
    deviceId: string,
    token: string,
    expiry: Date
  ): Promise<void>;

  deleteAllTokenByAccountId(accountId:string):Promise<void>
}
