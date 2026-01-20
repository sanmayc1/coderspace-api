import { TDifficulty } from '../../shared/constant';
import { IAccountsEntity } from './accounts-entity';

export interface ISubscription {
  planId: string;
  endDate: Date;
  startDate: Date;
}

export interface Rating {
  _id: string;
  rating: number;
}

export interface IUserEntity {
  _id?: string;
  accountId: string | IAccountsEntity;
  username: string;
  level?: number;
  xpCoin?: number;
  globalScore?: number;
  notification?: boolean;
  badge?: 'silver' | 'gold' | 'platinum';
  about?: string;
  subscription: ISubscription | null;
  isProfileComplete?: boolean;
  domain?: Rating[];
  skills?: Rating[];
  suggestionLevel?: TDifficulty;
  createdAt?: Date;
  updatedAt?: Date;
}
