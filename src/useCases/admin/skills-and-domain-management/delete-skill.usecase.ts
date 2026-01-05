import { inject, injectable } from 'tsyringe';
import { CustomError } from '../../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constant';
import { IDeleteSkillUsecase } from '../../Interfaces/admin/skills-and-domain-management/delete-skill.usecase.interface';
import { ISkillRepository } from '../../../domain/repositoryInterfaces/skill-repository.interface';

@injectable()
export class DeleteSkillUsecase implements IDeleteSkillUsecase {
  constructor(@inject('ISkillRepository') private _skillRepository: ISkillRepository) {}
  async execute(id: string): Promise<void> {
    const exists = await this._skillRepository.findById(id);

    if (!exists) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.SKILL_NOT_FOUND);
    }

    await this._skillRepository.deleteById(id);
  }
}
