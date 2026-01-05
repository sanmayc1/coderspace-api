import { inject, injectable } from 'tsyringe';
import { CustomError } from '../../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constant';
import { ICreateSkillUsecase } from '../../Interfaces/admin/skills-and-domain-management/create-skill.usecase.interface';
import { ISkillRepository } from '../../../domain/repositoryInterfaces/skill-repository.interface';

@injectable()
export class CreateSkillUsecase implements ICreateSkillUsecase {
  constructor(@inject('ISkillRepository') private _skillRepository: ISkillRepository) {}

  async execute(title: string): Promise<void> {
    title = title.toLocaleLowerCase().trim();
    const skillExist = await this._skillRepository.findByTitle(title);

    if (skillExist) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.SKILL_EXIST);
    }

    await this._skillRepository.create({ title });
  }
}
