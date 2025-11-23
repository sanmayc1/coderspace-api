import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IGetUsersUsecase } from "../../../useCases/Interfaces/admin/user-management/get-users.usecase.interface.js";
import {
  commonResponse,
  CustomError,
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../auth/index.js";
import { USER_SORTING } from "../../../shared/utils/mongo-utils.js";
import { searchRegex } from "../../../shared/validation/regex.js";
import { UserProfileUpdateSchema } from "./validation/schema.js";
import { IUpdateUserUsecase } from "../../../useCases/Interfaces/admin/user-management/update-user.usecase.interface.js";
import { IUpdateUserStatusUsecase } from "../../../useCases/Interfaces/admin/user-management/update-user-status.usecase.interface.js";

@injectable()
export class UserManagementController {
  constructor(
    @inject("IGetUsersUsecase") private _getUsersUsecase: IGetUsersUsecase,
    @inject("IUpdateUserUsecase") private _updateUserUsecase: IUpdateUserUsecase,
    @inject("IUpdateUserStatusUsecase") private _updateUserStatusUsecase:IUpdateUserStatusUsecase
  ) {}

  async getAllUsers(req: Request, res: Response) {
    const { page, sort, search, limit } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const searchValue = (search as string)?.trim() || "";
    const sortValue = (sort as string)?.trim() || "";

    if (Number.isNaN(pageNumber) || pageNumber <= 0) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.PAGE_NOT_NUMBER
      );
    }

    if (Number.isNaN(limitNumber) || limitNumber <= 0) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.LIMIT_NOT_NUMBER
      );
    }

    if (sortValue && !USER_SORTING.hasOwnProperty(sortValue)) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.INVALID_SORT
      );
    }

    if (searchValue && !searchRegex.test(searchValue)) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.INVALID_SEARCH
      );
    }

    const users = await this._getUsersUsecase.execute({
      page: pageNumber,
      sort: sortValue,
      limit: limitNumber,
      search: searchValue,
    });

    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.USERS_FETCHED, users));
  }

  async updateUserProfile(req: Request, res: Response) {
    const userId = req.params.id;
    const { currentLevel, currentBadge } = req.body;
    const validated = UserProfileUpdateSchema.safeParse({
      userId: userId,
      level: currentLevel,
      badge: currentBadge,
    });

    if (!validated.success) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        validated.error?._zod.def[0].message
      );
    }

    await this._updateUserUsecase.execute(validated.data);

    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.UPDATED));
  }

  async updateUserStatus (req: Request, res: Response){
    const accountId = req.params.id 
  
    if(!accountId.trim()){
      throw new CustomError(HTTP_STATUS.BAD_REQUEST,ERROR_MESSAGES.ACCOUNT_NOT_FOUND)
    }

    this._updateUserStatusUsecase.execute(accountId)

    res.status(HTTP_STATUS.OK).json(commonResponse(true,SUCCESS_MESSAGES.STATUS_UPDATED))

  }


}
