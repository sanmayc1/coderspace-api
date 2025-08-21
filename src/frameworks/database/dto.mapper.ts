import { IOtpEntity } from "../../entities/models/otp.entity.js";
import { IUserEntity } from "../../entities/models/user.entity.js";
import { IWalletEnitity } from "../../entities/models/wallet.Enitity.js";
import { IOtpModel } from "./models/otp.model.js";
import { IUserModel } from "./models/user.model.js";
import { IWalletModel } from "./models/wallet.model.js";

export const userMapperRepo = {
  toEntity(data: IUserModel): IUserEntity {
    return {
      name: data.name,
      email: data.email,
      _id: String(data._id),
      createdAt: data.createdAt,
      updtedAt: data.updtedAt,
      username: data.username,
      role: data.role,
      isProfileComplete: data.isProfileComplete,
      password: data.password,
      isVerified: data.isVerified,
      level: data.level,
      notification: data.notification,
      xpCoin: data.xpCoin,
      authProvider: data.authProvider,
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
      profileUrl: data.profession,
      skills: data.skills,
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
      userId: String(data.userId),
      userType: data.userType,
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
