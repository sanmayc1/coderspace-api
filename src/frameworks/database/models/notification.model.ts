import { Document, model, Types } from 'mongoose';
import { INotificationEntity } from '../../../domain/entities/notification-entity';
import { notificationSchema } from '../schema/notification.schema';

export interface INotificationModel extends Omit<INotificationEntity, '_id' | 'accountId'>, Document {
  _id: Types.ObjectId;
  accountId: Types.ObjectId;
}

export const NotificationModel = model<INotificationModel>('Notification', notificationSchema);
