export interface ICreateSkillUsecase {
  execute(title: string): Promise<void>;
}
