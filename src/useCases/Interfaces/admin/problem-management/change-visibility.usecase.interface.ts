export interface IChangeVisibilityUsecase {
  execute(id: string): Promise<void>;
}
