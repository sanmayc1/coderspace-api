import { IAccountsEntity } from "./accounts-entity";

export interface INotificationEntity {
  _id: string;
  accountId: string | IAccountsEntity;
  message: string;
  title?: string;
  type?: string;
  isRead: boolean;
  link?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
