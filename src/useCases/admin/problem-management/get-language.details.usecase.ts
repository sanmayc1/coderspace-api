import { inject, injectable } from "tsyringe";
import { IGetLanguageDetailsUsecaseOutput } from "../../dtos/admin.dto.js";
import { IGetLanguageDetailsUsecase } from "../../Interfaces/admin/problem-management/get-language-details.interface.js";
import { ILanguageRepository } from "../../../domain/repositoryInterfaces/language-repository.interface.js";
import { CustomError } from "../../../domain/utils/custom-error.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constant.js";
import { getLanguageDetailsUsecaseMapper } from "../../dtos/mappers/mappers.js";

@injectable()
export class GetLanguageDetailsUsecase implements IGetLanguageDetailsUsecase {
  constructor(
    @inject("ILanguageRepository")
    private _languageRepository: ILanguageRepository
  ) {}
  async execute(id: string): Promise<IGetLanguageDetailsUsecaseOutput> {
    const langaugeDetails = await this._languageRepository.findById(id);

    if (!langaugeDetails) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.LANGUAGES_NOT_FOUND
      );
    }

    const response =
      getLanguageDetailsUsecaseMapper.toResponse(langaugeDetails);

    return response;
  }
}
