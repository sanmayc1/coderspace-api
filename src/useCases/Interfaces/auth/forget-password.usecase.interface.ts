export interface IForgetPasswordUsecase {
  execute(token: string, newPassword: string): Promise<void>;
}
