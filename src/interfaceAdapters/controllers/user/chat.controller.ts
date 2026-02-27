import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { IGetAllChatsUsecase } from '../../../useCases/Interfaces/users/chat/get-all-chats.usecase';
import { commonResponse, HTTP_STATUS, SUCCESS_MESSAGES } from '../auth';
import { IGetChatUsecase } from '../../../useCases/Interfaces/users/chat/get-chat.usecase';

@injectable()
export class ChatController {
  constructor(
    @inject('IGetAllChatsUsecase') private _getAllChatsUsecase: IGetAllChatsUsecase,
    @inject('IGetChatUsecase') private _getChatsUsecase: IGetChatUsecase
  ) {}

  async getChats(req: Request, res: Response) {
    try {
      const accountId = req.user?.accountId;
      const chats = await this._getAllChatsUsecase.execute(accountId as string);
      res.status(HTTP_STATUS.OK).json(commonResponse(true, SUCCESS_MESSAGES.CHAT_FETCHED, chats));
    } catch (error) {}
  }

  async getChat(req: Request, res: Response) {
    try {
      const accountId = req.user?.accountId;
      const chats = await this._getChatsUsecase.execute(accountId as string,req.params.id);
      res.status(HTTP_STATUS.OK).json(commonResponse(true, SUCCESS_MESSAGES.CHAT_FETCHED, chats));
    } catch (error) {}
  }
}
