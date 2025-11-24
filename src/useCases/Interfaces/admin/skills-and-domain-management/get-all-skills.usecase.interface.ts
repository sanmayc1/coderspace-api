import { IGetAllSkillsUsecaseOutput } from "../../../dtos/admin.dto.js";

export interface IGetAllSkillsUsecase {
  executes(): Promise<IGetAllSkillsUsecaseOutput>;
}
