import { IGetAllSkillsUsecaseOutput } from '../../dtos/admin.dto';

export interface IGetAllSkillsUsecase {
  executes(): Promise<IGetAllSkillsUsecaseOutput>;
}
