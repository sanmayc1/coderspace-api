import { injectable } from 'tsyringe';
import { BaseRepository } from './base-repository';
import { INotificationModel, NotificationModel } from '../../frameworks/database/models/notification.model';
import { INotificationEntity } from '../../domain/entities/notification-entity';
import { INotificationRepository } from '../../domain/repositoryInterfaces/notification-repository.interface';
import { notificationRepositoryMapper } from '../../frameworks/database/dtoMappers/dto.mapper';
import { IMongoOptions } from '../../domain/repositoryInterfaces/problem-repository.interface';
import { Types } from 'mongoose';

@injectable()
export class NotificationRepository
  extends BaseRepository<INotificationModel, INotificationEntity>
  implements INotificationRepository
{
  constructor() {
    super(NotificationModel, notificationRepositoryMapper.toEntity, notificationRepositoryMapper.toModel);
  }

  async getAllNotificationsOfUser(accountId: string, options?: IMongoOptions): Promise<{ notifications: INotificationEntity[], total: number }> {
    const limit = options?.limit || 10;
    const skip = options?.skip || 0;
    const filter = { accountId: new Types.ObjectId(accountId) };

    const [docs, total] = await Promise.all([
      NotificationModel.find({ ...filter, isRead: false }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      NotificationModel.countDocuments({ ...filter, isRead: false })
    ]);
    
    return {
      notifications: docs.map(doc => notificationRepositoryMapper.toEntity(doc as any)),
      total
    };
  }

  async markAsRead(notificationId: string): Promise<void> {
    await NotificationModel.updateOne({ _id: new Types.ObjectId(notificationId) }, { isRead: true });
  }

  async markAllAsRead(accountId: string): Promise<void> {
    await NotificationModel.updateMany({ accountId: new Types.ObjectId(accountId) }, { isRead: true });
  }
}
