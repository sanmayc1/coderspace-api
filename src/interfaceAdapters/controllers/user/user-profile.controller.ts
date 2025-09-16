import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import {
  commonResponse,
  HTTP_STATUS,
  IJwtPayload,
  SUCCESS_MESSAGES,
} from "../auth/index.js";
import { IGetUserUsecase } from "../../../useCases/Interfaces/users/user-profile/user-profile.usecase.interface.js";

@injectable()
export class UserProfileController {
  constructor(
    @inject("IGetUserUsecase") private _getUserUsecase: IGetUserUsecase
  ) {}

  async getUser(req: Request, res: Response) {
    const accountId = (req.user as IJwtPayload).accountId;

    const response = await this._getUserUsecase.execute(accountId)

    res.status(HTTP_STATUS.OK).json(commonResponse(true,SUCCESS_MESSAGES.USER_FETCHED,response))
  }
}
