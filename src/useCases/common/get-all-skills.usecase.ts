import { inject, injectable } from "tsyringe";
import { IGetAllSkillsUsecaseOutput } from "../dtos/admin.dto.js";
import { getAllSkillsUsecaseMapper } from "../dtos/mappers/mappers.js";
import { IGetAllSkillsUsecase } from "../Interfaces/common/get-all-skills.usecase.interface.js";
import { ISkillRepository } from "../../domain/repositoryInterfaces/skill-repository.interface.js";

@injectable()
export class GetAllSkillsUsecase implements IGetAllSkillsUsecase {
  constructor(
    @inject("ISkillRepository") private _skillRepository: ISkillRepository
  ) {}

  async executes(): Promise<IGetAllSkillsUsecaseOutput> {
    const domains = await this._skillRepository.getAll();

    const response = domains.map((d) =>
      getAllSkillsUsecaseMapper.toResponse(d)
    );

    return { skills: response };
  }
}
