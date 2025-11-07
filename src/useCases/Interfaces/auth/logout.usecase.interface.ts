export interface ILogoutUsecase {
  executes(
    refreshToken: string,
    accessToken: string,
  ): Promise<void>;
}



