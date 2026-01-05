import { Rating } from '../../domain/entities/user.entity';
import { TDifficulty } from '../../shared/constant';

export interface IGetUserUsecaseOutputDto {
  id: string;
  name: string;
  username: string;
  xpCoin: number;
  currentLevel: number;
  currentBadge: string;
  accountId: string;
  about?: string;
  premiumActive: boolean;
  profileUrl: string;
  skills: Rating[];
  auth: string;
}

export interface IUpdateSuggestionLevelInputDto {
  level: TDifficulty;
  accountId: string;
}

export interface IUpdateUserProfileInputDto {
  name: string;
  username: string;
  about?: string;
  profileImage: Express.Multer.File | undefined;
  accountId: string;
}

export interface IUpdateUserPasswordInputDto {
  currentPassword: string;
  newPassword: string;
  accountId: string;
}


export interface IGetAllCodersUsecaseOutputDto {
    userId:string
    name:string
    username:string
    badge:string
    profileUrl:string
    isFollowing:boolean
}