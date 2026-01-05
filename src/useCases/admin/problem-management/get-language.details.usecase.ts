import { inject, injectable } from 'tsyringe';
import { IGetLanguageDetailsUsecaseOutput } from '../../dtos/admin.dto';
import { IGetLanguageDetailsUsecase } from '../../Interfaces/admin/problem-management/get-language-details.interface';
import { ILanguageRepository } from '../../../domain/repositoryInterfaces/language-repository.interface';
import { CustomError } from '../../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constant';
import { getLanguageDetailsUsecaseMapper } from '../../dtos/mappers/mappers';

@injectable()
export class GetLanguageDetailsUsecase implements IGetLanguageDetailsUsecase {
  constructor(
    @inject('ILanguageRepository')
    private _languageRepository: ILanguageRepository
  ) {}
  async execute(id: string): Promise<IGetLanguageDetailsUsecaseOutput> {
    const langaugeDetails = await this._languageRepository.findById(id);

    if (!langaugeDetails) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.LANGUAGES_NOT_FOUND);
    }

    const response = getLanguageDetailsUsecaseMapper.toResponse(langaugeDetails);

    return response;
  }
}
