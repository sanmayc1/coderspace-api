import { inject, injectable } from "tsyringe";
import { IProblemRepository } from "../../../domain/repositoryInterfaces/problem-repository.interface.js";
import { IAddLanguageUsecaseInputDto } from "../../dtos/admin.dto.js";
import { IAddLanguageUsecase } from "../../Interfaces/admin/problem-management/add-language.usecase.interface.js";
import { ILanguageRepository } from "../../../domain/repositoryInterfaces/language-repository.interface.js";
import { templateCodes } from "../../../shared/constant.js";

@injectable()
export class AddLanguageUsecase implements IAddLanguageUsecase {
  constructor(
    @inject("IProblemRepository")
    private _problemRepository: IProblemRepository,
    @inject("ILanguageRepository")
    private _languageRepository: ILanguageRepository
  ) {}
  async execute(data: IAddLanguageUsecaseInputDto): Promise<void> {
    const templateCode = templateCodes[data.language];
    const newLanguage = await this._languageRepository.create({
      language: data.language,
      templateCode,
      solution: templateCode,
      functionName: "solve",
    });

    await this._problemRepository.addLanguage(
      data.problemId,
      newLanguage._id as string
    );
  }
}
