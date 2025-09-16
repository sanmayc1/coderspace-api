import mongoose, {  Types } from "mongoose";
import { IAccountsEntity } from "../../../entities/models/accounts-entity.js";
import { IOtpEntity } from "../../../entities/models/otp.entity.js";
import { IUserEntity } from "../../../entities/models/user.entity.js";
import { IWalletEnitity } from "../../../entities/models/wallet.entity.js";
import { IAccountsModel } from "../models/account.model .js";
import { IOtpModel } from "../models/otp.model.js";
import { IUserModel } from "../models/user.model.js";
import { IWalletModel } from "../models/wallet.model.js";
import { ICompanyModel } from "../models/company.model.js";
import { ICompanyEntity } from "../../../entities/models/company-entity.js";

export const userMapperRepo = {
  toEntity(data: IUserModel): IUserEntity {
    return {
      _id: String(data._id),
      createdAt: data.createdAt,
      updtedAt: data.updtedAt,
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
      experience: data.experience,
      githubUrl: data.githubUrl,
      globalScore: data.globalScore,
      linkedinUrl: data.linkedinUrl,
      location: data.location,
      phone: data.phone,
      planHistory: data.planHistory,
      position: data.position,
      profession: data.profession,
      skills: data.skills,
      accountId:
        data.accountId instanceof Types.ObjectId
          ? String(data.accountId)
          : (data.accountId as IAccountsEntity),
    };
  },
};

export const walletMapper = {
  toEntity(data: IWalletModel): IWalletEnitity {
    return {
      _id: String(data._id),
      balance: data.balance,
      contestAmount: data.balance,
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
      isBlocked:data.isBlocked
    };
  },
  toModel(data: Partial<IAccountsEntity>): Partial<IAccountsModel> {
    return {
      ...(data.email && { email: data.email }),
      ...(data.name && { name: data.name }),
      ...(data.password && { password: data.password }),
      ...(data.authProvider && { authProvider: data.authProvider }),
      ...(data.isVerified && { isVerified: data.isVerified }),
      ...(data.profileUrl && { profileUrl: data.profileUrl }),
      ...(data.role && { role: data.role }),
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
