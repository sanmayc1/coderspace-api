import { inject, injectable } from "tsyringe";
import { IGetAllNotificationsUsecase } from "../../Interfaces/common/notification/get-all-notifications.usecase.interface";
import { INotificationRepository } from "../../../domain/repositoryInterfaces/notification-repository.interface";
import { IMongoOptions } from "../../../domain/repositoryInterfaces/problem-repository.interface";
import { INotificationEntity } from "../../../domain/entities/notification-entity";

@injectable()
export class GetAllNotificationsUsecase implements IGetAllNotificationsUsecase {
  constructor(
    @inject('INotificationRepository') private _notificationRepository: INotificationRepository
  ) {}

  async execute(accountId: string, options?: IMongoOptions): Promise<{ notifications: INotificationEntity[], total: number }> {
    return this._notificationRepository.getAllNotificationsOfUser(accountId, options);
  }
}
