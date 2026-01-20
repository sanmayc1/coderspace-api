import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { IGetAllCodersUsecase } from '../../../useCases/Interfaces/users/coders/get-all-coders.usecase.interface';
import { commonResponse, HTTP_STATUS, SUCCESS_MESSAGES } from '../auth';
import { IFollowCodersUsecase } from '../../../useCases/Interfaces/users/coders/follow-coders.usecase.interface';
import { IUnfollowCodersUsecase } from '../../../useCases/Interfaces/users/coders/unfollow-coders-usecase.interface';
import { IGetCoderUsecase } from '../../../useCases/Interfaces/users/coders/get-coder.usecase.interface';

@injectable()
export class CodersController {
  constructor(
    @inject('IGetAllCodersUsecase') private _getAllCodersUsecase: IGetAllCodersUsecase,
    @inject('IFollowCodersUsecase') private _followCodersUsecase: IFollowCodersUsecase,
    @inject('IUnfollowCodersUsecase') private _unfollowCodersUsecase: IUnfollowCodersUsecase,
    @inject('IGetCoderUsecase') private _getCoderUsecase: IGetCoderUsecase,
  ) {}

  async getAllCoders(req: Request, res: Response) {
    const coders = await this._getAllCodersUsecase.execute(req.user?.accountId as string);

    res.status(HTTP_STATUS.OK).json(commonResponse(true, SUCCESS_MESSAGES.GET_ALL_CODERS, coders));
  }

  async followCoders(req: Request, res: Response) {
    const { followingId } = req.body;

    await this._followCodersUsecase.execute(req.user?.accountId as string, followingId);

    res.status(HTTP_STATUS.OK).json(commonResponse(true, SUCCESS_MESSAGES.FOLLOW_CODER));
  }

  async unfollowCoders(req: Request, res: Response) {
    const { id } = req.params;

    await this._unfollowCodersUsecase.execute(req.user?.accountId as string, id);

    res.status(HTTP_STATUS.OK).json(commonResponse(true, SUCCESS_MESSAGES.UNFOLLOW_CODER));
  }

  async getCoder(req: Request, res: Response) {
    const { id } = req.params;

    const coder = await this._getCoderUsecase.execute(req.user?.accountId as string, id);

    res.status(HTTP_STATUS.OK).json(commonResponse(true, SUCCESS_MESSAGES.GET_CODER, coder));
  }
}
