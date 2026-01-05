import { inject, injectable } from 'tsyringe';
import { ILanguageRepository } from '../../../domain/repositoryInterfaces/language-repository.interface';
import { IUpdateLanguageUsecaseInput } from '../../dtos/admin.dto';
import { IUpdateLanguageUsecase } from '../../Interfaces/admin/problem-management/update-language.interface';
import { CustomError } from '../../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constant';

@injectable()
export class UpdateLanguageUseCase implements IUpdateLanguageUsecase {
  constructor(
    @inject('ILanguageRepository')
    private _languageRepository: ILanguageRepository
  ) {}
  async execute(data: IUpdateLanguageUsecaseInput): Promise<void> {
    const language = await this._languageRepository.findById(data.languageId);
    if (!language) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.LANGUAGES_NOT_FOUND);
    }

    await this._languageRepository.updateById(data.languageId, {
      templateCode: data.templateCode,
      functionName: data.fnName,
      solution: data.solution,
    });
  }
}
