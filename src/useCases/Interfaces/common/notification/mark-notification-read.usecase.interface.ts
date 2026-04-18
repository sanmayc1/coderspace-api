export interface IMarkNotificationReadUsecase {
  execute(accountId: string): Promise<void>;
}
