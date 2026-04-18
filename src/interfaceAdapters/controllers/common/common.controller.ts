import { inject, injectable } from 'tsyringe';
import { IGetAllSkillsUsecase } from '../../../useCases/Interfaces/common/get-all-skills.usecase.interface';
import {
  commonResponse,
  CustomError,
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from '../auth/index';
import { Request, Response } from 'express';
import { IGetContestLeaderboardUsecase } from '../../../useCases/Interfaces/common/get-contest-leaderboard';
import { IChangeAccountPasswordUsecase } from '../../../useCases/Interfaces/common/change-account-password.usecase.interface';
import { UpdatePasswordSchema } from '../auth/validation/user-validation-schema';

@injectable()
export class CommonController {
  constructor(
    @inject('IGetAllSkillsUsecase')
    private _getAllSkillsUsecase: IGetAllSkillsUsecase,
    @inject('IGetContestLeaderboardUsecase')
    private _getContestLeaderboardUsecase: IGetContestLeaderboardUsecase,
    @inject('IChangeAccountPasswordUsecase')
    private _changeAccountPasswordUsecase: IChangeAccountPasswordUsecase
  ) {}

  async getAllSkills(req: Request, res: Response) {
    const response = await this._getAllSkillsUsecase.executes();
    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.GET_ALL_SKILLS, response));
  }

  async getContestLeaderboard(req: Request, res: Response) {
    const { id } = req.params;
    const { page, search } = req.query;
    const currentPage = Number(page);

    if (isNaN(currentPage)) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.PAGE_NOT_NUMBER);
    }
    const response = await this._getContestLeaderboardUsecase.execute(
      id,
      currentPage,
      (search as string) || ''
    );
    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.CONTEST_LEADERBOARD_FETCHED, response));
  }

  async changeAccountPassword(req: Request, res: Response) {
    const response = await this._changeAccountPasswordUsecase.execute({
      ...req.body,
      accountId: req?.user?.accountId as string,
    });
    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.ACCOUNT_PASSWORD_CHANGED, response));
  }
}
