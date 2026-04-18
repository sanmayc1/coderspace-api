import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { commonResponse, HTTP_STATUS, SUCCESS_MESSAGES } from '../auth/index';
import { IGetAllNotificationsUsecase } from '../../../useCases/Interfaces/common/notification/get-all-notifications.usecase.interface';
import { IMarkNotificationReadUsecase } from '../../../useCases/Interfaces/common/notification/mark-notification-read.usecase.interface';

@injectable()
export class NotificationController {
  constructor(
    @inject('IGetAllNotificationsUsecase') private _getAllNotificationsUsecase: IGetAllNotificationsUsecase,
    @inject('IMarkNotificationReadUsecase') private _markNotificationReadUsecase: IMarkNotificationReadUsecase
  ) {}

  async getNotifications(req: Request, res: Response) {
    const accountId = req.user?.accountId as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const response = await this._getAllNotificationsUsecase.execute(accountId, { limit, skip });
    res.status(HTTP_STATUS.OK).json(commonResponse(true, "Notifications fetched successfully", response));
  }

  async markAsRead(req: Request, res: Response) {
    const accountId = req.user?.accountId as string;
    
    await this._markNotificationReadUsecase.execute(accountId);
    res.status(HTTP_STATUS.OK).json(commonResponse(true, "Notification(s) marked as read"));
  }
}
