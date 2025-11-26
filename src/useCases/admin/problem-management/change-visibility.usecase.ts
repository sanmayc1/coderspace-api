import { inject, injectable } from "tsyringe";
import { IProblemRepository } from "../../../domain/repositoryInterfaces/problem-repository.interface.js";
import { IChangeVisibilityUsecase } from "../../Interfaces/admin/problem-management/change-visibility.usecase.interface.js";
import { CustomError } from "../../../domain/utils/custom-error.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constant.js";

@injectable()
export class ChangeVisibilityUsecase implements IChangeVisibilityUsecase {
  constructor(
    @inject("IProblemRepository") private _problemRepository: IProblemRepository
  ) {}
  async execute(id: string): Promise<void> {
    const exits = await this._problemRepository.findById(id);

    if (!exits) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.PROBLEM_NOT_FOUND
      );
    }

    if(exits.view === "private" && exits.addedLanguagesId.length === 0){
        throw new CustomError(
            HTTP_STATUS.BAD_REQUEST,
            ERROR_MESSAGES.NO_LANGUAGE_ADDED
          );
    }

    await this._problemRepository.updateById(id, {
      view: exits.view === "private" ? "public" : "private",
    });
  }
}
