import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import {
  commonResponse,
  HTTP_STATUS,
  IJwtPayload,
  SUCCESS_MESSAGES,
} from "../auth/index.js";
import { IGetUserUsecase } from "../../../useCases/Interfaces/users/user-profile/user-profile.usecase.interface.js";
import { DIFFICULTY, ERROR_MESSAGES } from "../../../shared/constant.js";
import { IUpdateSuggestionLevelUsecase } from "../../../useCases/Interfaces/users/user-profile/update-suggestion-level.js";
import { userProfileUpdateSchema } from "./validation/user.validation.js";
import cloudinary from "../../../shared/utils/cloudinary.js";
import { IUpdateUserProfileUsecase } from "../../../useCases/Interfaces/users/user-profile/update-user-profile.usecase.interface.js";

@injectable()
export class UserProfileController {
  constructor(
    @inject("IGetUserUsecase") private _getUserUsecase: IGetUserUsecase,
    @inject("IUpdateSuggestionLevelUsecase")
    private _updateSuggestionLevelUsecase: IUpdateSuggestionLevelUsecase,
    @inject("IUpdateUserProfileUsecase")
    private _updateUserProfileUsecase: IUpdateUserProfileUsecase
  ) {}

  async getUser(req: Request, res: Response) {
    const accountId = (req.user as IJwtPayload).accountId;

    const response = await this._getUserUsecase.execute(accountId);

    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.USER_FETCHED, response));
  }

  async updateSuggestionLevel(req: Request, res: Response) {
    const { level } = req.body;

    if (!level || !DIFFICULTY.includes(level)) {
      res.status(400).json(commonResponse(false, ERROR_MESSAGES.INVALID_BODY));
      return;
    }

    await this._updateSuggestionLevelUsecase.execute({
      level,
      accountId: req?.user?.accountId as string,
    });

    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.SUGGESTION_LEVEL));
  }

  async updateUserProfile(req: Request, res: Response) {
    const valiidatedData = userProfileUpdateSchema.parse(req.body);

   await this._updateUserProfileUsecase.execute({
      ...valiidatedData,
      accountId: req?.user?.accountId as string,
      profileImage: req?.file,
    });

    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.USER_PROFILE_UPDATED));
  }
}
