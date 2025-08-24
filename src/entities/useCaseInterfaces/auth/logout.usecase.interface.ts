export interface ILogoutUsecase {
  executes(
    refreshToken: string,
    accessToken: string,
    deviceId: string
  ): Promise<void>;
}
