export interface IDeleteTestcaseUsecase {
  execute(id: string): Promise<void>;
}
