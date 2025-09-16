import { IAccountsEntity } from "../../entities/models/accounts-entity.js";
import { IUserEntity } from "../../entities/models/user.entity.js";
import { TBadge, TRole } from "../../shared/constant.js";
import {
  IGetUsersUsecaseOutputDto,
  IGetUsersUsecaseUserDto,
} from "../dtos/admin.dto.js";
import {
  IAuthResponseDto,
  IGoogleAuthUsecaseInputDto,
} from "../dtos/auth.dto.js";
import { IGetUserUsecaseOutputDto } from "../dtos/user.dto.js";

export const authUserUsecaseMapper = {
  toOutput(account: IAccountsEntity, user?: IUserEntity): IAuthResponseDto {
    return {
      accountId: account._id as string,
      email: account.email,
      ...(user?.isProfileComplete !== undefined && {
        profileComplete: user?.isProfileComplete,
      }),
      profileUrl: account.profileUrl || "",
      role: account.role as TRole,
    };
  },
};

export const googleAuthUsecaseMapper = {
  toEntity(data: IGoogleAuthUsecaseInputDto): IAccountsEntity {
    return {
      email: data.emails[0].value as string,
      name: data.displayName as string,
      authProvider: "google",
      profileUrl: data.photos && data.photos[0].value,
      isVerified: true,
    };
  },
};

export const getUsersUsecaseMapper = {
  toUserDto(data: IUserEntity): IGetUsersUsecaseUserDto {
    return {
      accountId: String((data.accountId as IAccountsEntity)._id),
      userId: data._id as string,
      badge: data.badge as TBadge,
      email: (data.accountId as IAccountsEntity).email,
      level: data.level as number,
      blocked: (data.accountId as IAccountsEntity).isBlocked as boolean,
      username: data.username,
      ...((data.accountId as IAccountsEntity).profileUrl && {
        profileUrl: (data.accountId as IAccountsEntity).profileUrl,
      }),
    };
  },

  toRespone(
    users: IGetUsersUsecaseUserDto[],
    currentPage: number,
    totalPages: number
  ): IGetUsersUsecaseOutputDto {
    return {
      page: currentPage,
      totalPages,
      users,
    };
  },
};

export const getUserUsecaseMapper = {
  toOutput(
    user: IUserEntity,
    account: IAccountsEntity
  ): IGetUserUsecaseOutputDto {
    return {
      accountId: user.accountId as string,
      currentBadge: user.badge as string,
      currentLevel: user.level as number,
      id: user._id as string,
      name: account.name,
      premiumActive: user.isPremiumActive as boolean,
      skills: user.skills || [],
      username: user.username,
      xpCoin: user.xpCoin as number,
      about: (user.about as string) || "",
    };
  },
};
