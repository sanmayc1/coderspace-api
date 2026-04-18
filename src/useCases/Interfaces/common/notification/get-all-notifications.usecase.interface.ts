import { INotificationEntity } from "../../../../domain/entities/notification-entity";
import { IMongoOptions } from "../../../../domain/repositoryInterfaces/problem-repository.interface";

export interface IGetAllNotificationsUsecase {
  execute(accountId: string, options?: IMongoOptions): Promise<{ notifications: INotificationEntity[], total: number }>;
}
