import { IAccountsEntity } from "../../../domain/entities/accounts-entity.js";
import { ICompanyEntity } from "../../../domain/entities/company-entity.js";
import { IDomainEntity } from "../../../domain/entities/domain-entity.js";
import { ILanguageEntity } from "../../../domain/entities/langauge-entity.js";
import { IProblemEntity } from "../../../domain/entities/problem-entity.js";
import { ISkillEntity } from "../../../domain/entities/skill-entity.js";
import { IUserEntity } from "../../../domain/entities/user.entity.js";
import { TBadge, TLanguages, TRole } from "../../../shared/constant.js";
import {
  IDomainDto,
  IGetAllProblemUsecaseOutputDto,
  IGetUsersUsecaseOutputDto,
  IGetUsersUsecaseUserDto,
  ISkillDto,
} from "../admin.dto.js";
import { IAuthResponseDto, IGoogleAuthUsecaseInputDto } from "../auth.dto.js";
import { IGetCompanyUsecaseOutputDto } from "../company.dto.js";
import { IGetUserUsecaseOutputDto } from "../user.dto.js";

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

export const getCompanyUsecaseMapper = {
  toResponse(
    account: IAccountsEntity,
    company: ICompanyEntity
  ): IGetCompanyUsecaseOutputDto {
    return {
      companyName: account.name,
      email: account.email,
      gstin: company.gstin,
      profileUrl: account.profileUrl || "",
    };
  },
};

export const getAllDomainsUsecaseMapper = {
  toResponse(data: IDomainEntity): IDomainDto {
    return {
      id: String(data._id),
      title: data.title,
    };
  },
};

export const getAllSkillsUsecaseMapper = {
  toResponse(data: ISkillEntity): ISkillDto {
    return {
      id: String(data._id),
      title: data.title,
    };
  },
};

export const getAllProblemsUsecaseMapper = {
  toResponse(
    totalPages: number,
    currentPage: number,
    problems: IProblemEntity[]
  ): IGetAllProblemUsecaseOutputDto {
    return {
      currentPage,
      totalPages,
      problems: problems.map((s) => ({
        languages:s.addedLanguagesId ? (s.addedLanguagesId as ILanguageEntity[]).map((l)=>l.language):[],
        id: s._id as string,
        number: s.problemNumber as number,
        title: s.title,
        view: s.view,
      })),
    };
  },
};
