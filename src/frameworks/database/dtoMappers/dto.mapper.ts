import mongoose, { Types } from "mongoose";
import { IAccountsEntity } from "../../../domain/entities/accounts-entity.js";
import { IOtpEntity } from "../../../domain/entities/otp.entity.js";
import { IUserEntity } from "../../../domain/entities/user.entity.js";
import { IWalletEnitity } from "../../../domain/entities/wallet.entity.js";
import { IAccountsModel } from "../models/account.model .js";
import { IOtpModel } from "../models/otp.model.js";
import { IUserModel } from "../models/user.model.js";
import { IWalletModel } from "../models/wallet.model.js";
import { ICompanyModel } from "../models/company.model.js";
import { ICompanyEntity } from "../../../domain/entities/company-entity.js";
import { TBadge } from "../../../shared/constant.js";
import { IProblemModel } from "../models/problem.model.js";
import { IProblemEntity } from "../../../domain/entities/problem-entity.js";
import { IDomainEntity } from "../../../domain/entities/domain-entity.js";
import { ISkillEntity } from "../../../domain/entities/skill-entity.js";

export const userMapperRepo = {
  toEntity(data: IUserModel): IUserEntity {
    return {
      _id: String(data._id),
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      username: data.username,
      isProfileComplete: data.isProfileComplete,
      level: data.level,
      notification: data.notification,
      xpCoin: data.xpCoin,
      badge: data.badge,
      isPremiumActive: data.isPremiumActive,
      about: data.about,
      dateOfBirth: data.dateOfBirth,
      domain: data.domain,
      suggestionLevel: data.suggestionLevel,
      githubUrl: data.githubUrl,
      globalScore: data.globalScore,
      linkedinUrl: data.linkedinUrl,
      location: data.location,
      phone: data.phone,
      planHistory: data.planHistory,
      skills: data.skills,
      accountId:
        data.accountId instanceof Types.ObjectId
          ? String(data.accountId)
          : (data.accountId as IAccountsEntity),
    };
  },
  toModel(data: Partial<IUserEntity>): Partial<IUserModel> {
    return {
      ...(data.about && { about: data.about }),
      ...(data.accountId && {
        accountId: new mongoose.Types.ObjectId(data.accountId as string),
      }),
      ...(data.badge && { badge: data.badge as TBadge }),
      ...(data.dateOfBirth && { dateOfBirth: data.dateOfBirth }),
      ...(data.domain && { domain: data.domain }),
      ...(data.suggestionLevel && { suggestionLevel: data.suggestionLevel }),
      ...(data.githubUrl && { githubUrl: data.githubUrl }),
      ...(data.globalScore && { globalScore: data.globalScore }),
      ...(data.isPremiumActive && { isPremiumActive: data.isPremiumActive }),
      ...(data.isProfileComplete && {
        isProfileComplete: data.isProfileComplete,
      }),
      ...(data.level && { level: data.level }),
      ...(data.linkedinUrl && { linkedinUrl: data.linkedinUrl }),
      ...(data.location && { location: data.location }),
      ...(data.notification && { notification: data.notification }),
      ...(data.phone && { phone: data.phone }),
      ...(data.planHistory && { planHistory: data.planHistory }),
      ...(data.skills && { skills: data.skills }),
      ...(data.username && { username: data.username as string }),
      ...(data.xpCoin && { xpCoin: data.xpCoin as number }),
    };
  },
};

export const walletMapper = {
  toEntity(data: IWalletModel): IWalletEnitity {
    return {
      _id: String(data._id),
      balance: data.balance,
      contestAmount: data.contestAmount,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      accountId: String(data.accountId),
    };
  },
  toModel(data: Partial<IWalletEnitity>): Partial<IWalletModel> {
    return {
      ...(data.accountId && { accountId: new Types.ObjectId(data.accountId) }),
      ...(data.balance && { balance: data.balance }),
      ...(data.contestAmount && { contestAmount: data.contestAmount }),
    };
  },
};

export const otpMapper = {
  toEntity(data: IOtpModel): IOtpEntity {
    return {
      _id: String(data._id),
      email: data.email,
      expiry: data.expiry,
      otp: data.otp,
    };
  },
};

export const accountRepositoryMapper = {
  toEntity(data: IAccountsModel): IAccountsEntity {
    return {
      email: data.email,
      name: data.name,
      password: data.password,
      _id: String(data._id),
      authProvider: data.authProvider,
      isVerified: data.isVerified,
      profileUrl: data.profileUrl || "",
      role: data.role,
      isBlocked: data.isBlocked,
    };
  },
  toModel(data: Partial<IAccountsEntity>): Partial<IAccountsModel> {
    return {
      ...(data.email && { email: data.email }),
      ...(data.name && { name: data.name }),
      ...(data.password && { password: data.password }),
      ...(data.authProvider && { authProvider: data.authProvider }),
      ...(data.isVerified !== undefined && { isVerified: data.isVerified }),
      ...(data.profileUrl && { profileUrl: data.profileUrl }),
      ...(data.role && { role: data.role }),
      ...(data.isBlocked !== undefined && { isBlocked: data.isBlocked }),
    };
  },
};

export const companyRepositoryMapper = {
  toEntity(data: ICompanyModel): ICompanyEntity {
    return {
      accountId: String(data._id),
      gstin: data.gstin,
      createdAt: data.createdAt,
      updtedAt: data.updtedAt,
    };
  },
  toModel(data: Partial<ICompanyEntity>): Partial<ICompanyModel> {
    return {
      ...(data.accountId && {
        accountId: new mongoose.Types.ObjectId(data.accountId),
      }),
      ...(data.gstin && { gstin: data.gstin }),
    };
  },
};

export const problemRepositoryMapper = {
  toEntity(data: IProblemModel): IProblemEntity {
    return {
      _id: String(data._id),
      title: data.title,
      constraints: data.constraints,
      description: data.description,
      difficulty: data.difficulty,
      domainId:
        data.domainId instanceof Types.ObjectId
          ? String(data.domainId)
          : (data.domainId as IDomainEntity),
      examples: data.examples || [],
      isPremium: data.isPremium,
      skillsIds:
        data.skillsIds?.map((s) =>
          s instanceof Types.ObjectId ? String(s) : (s as ISkillEntity)
        ) ,
      view: data.view,
    };
  },
  toModel(data: Partial<IProblemEntity>): Partial<IProblemModel> {
    return {
      ...(data.title && { title: data.title }),
      ...(data.description && { description: data.description }),
      ...(data.constraints && { constraints: data.constraints }),
      ...(data.difficulty && { difficulty: data.difficulty }),
      ...(data.domainId && {
        domainId: new Types.ObjectId(String(data.domainId)),
      }),
      ...(data.examples && { examples: data.examples }),
      ...(data.isPremium !== undefined && { isPremium: data.isPremium }),
      ...(data.skillsIds && {
        skillsIds: data.skillsIds.map((s) => new Types.ObjectId(String(s))),
      }),
      ...(data.view && { view: data.view }),
    };
  },
};
