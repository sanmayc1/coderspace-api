import { INotificationEntity } from "../entities/notification-entity";
import { IBaseRepository } from "./base-repository.interface";
import { IMongoOptions } from "./problem-repository.interface";

export interface INotificationRepository extends IBaseRepository<INotificationEntity> {
  getAllNotificationsOfUser(accountId: string, options?: IMongoOptions): Promise<{ notifications: INotificationEntity[], total: number }>;
  markAsRead(notificationId: string): Promise<void>;
  markAllAsRead(accountId: string): Promise<void>;
}
