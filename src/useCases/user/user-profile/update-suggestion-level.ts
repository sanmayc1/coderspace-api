import { inject, injectable } from "tsyringe";
import { IUpdateSuggestionLevelInputDto } from "../../dtos/user.dto.js";
import { IUpdateSuggestionLevelUsecase } from "../../Interfaces/users/user-profile/update-suggestion-level.js";
import { IUserRepository } from "../../../domain/repositoryInterfaces/user-repository.interface.js";
import { CustomError } from "../../../domain/utils/custom-error.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constant.js";

@injectable()
export class UpdateSuggestionLevelUsecase
  implements IUpdateSuggestionLevelUsecase
{
  constructor(
    @inject("IUserRepository") private _userRepository: IUserRepository
  ) {}
  async execute(data: IUpdateSuggestionLevelInputDto): Promise<void> {

    const user = await this._userRepository.findByAccountId(data.accountId)
    if(!user){
      throw new  CustomError(HTTP_STATUS.BAD_REQUEST,ERROR_MESSAGES.USER_NOT_FOUND)
    }
    await this._userRepository.updateById(String(user._id),{isProfileComplete:true,suggestionLevel:data.level})
  }
}

