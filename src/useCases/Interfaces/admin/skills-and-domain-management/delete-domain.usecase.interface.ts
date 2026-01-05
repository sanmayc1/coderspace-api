export interface IDeleteDomainUsecase {
  execute(id: string): Promise<void>;
}
