import mongoose, { Types } from 'mongoose';
import { IAccountsEntity } from '../../../domain/entities/accounts-entity';
import { IUserEntity } from '../../../domain/entities/user.entity';
import { IWalletEnitity } from '../../../domain/entities/wallet.entity';
import { IAccountsModel } from '../models/account.model ';
import { IUserModel } from '../models/user.model';
import { IWalletModel } from '../models/wallet.model';
import { ICompanyModel } from '../models/company.model';
import { ICompanyEntity } from '../../../domain/entities/company-entity';
import { TBadge } from '../../../shared/constant';
import { IProblemModel } from '../models/problem.model';
import { IProblemEntity } from '../../../domain/entities/problem-entity';
import { IDomainEntity } from '../../../domain/entities/domain-entity';
import { ISkillEntity } from '../../../domain/entities/skill-entity';
import { IDomainModel } from '../models/domain.model';
import { ISkillModel } from '../models/skill.model';
import { ILanguageEntity } from '../../../domain/entities/langauge-entity';
import { ILanguageModel } from '../models/language.model';
import { ITestcaseEntity } from '../../../domain/entities/testcase-entity';
import { ITestcaseModel } from '../models/testcase.model';
import { IContestEntity } from '../../../domain/entities/contest-entity';
import { IContestModel } from '../models/contest.model';
import { IFollowerModel } from '../models/follower.model';
import { IFollowerEntity } from '../../../domain/entities/follower-entity';
import { ISubmitProblemModel } from '../models/submit-problem.model';
import { ISubmitProblemEntity } from '../../../domain/entities/submit-problem.entity';
import { IPlanModel } from '../models/plan.model';
import { IPlanEntity } from '../../../domain/entities/plan-entity';
import { IPaymentModel } from '../models/payment.model';
import { IPaymentEntity } from '../../../domain/entities/payment.entity';
import { IContestAttemptModel } from '../models/contest-attempt.model';
import { IContestAttemptEntity } from '../../../domain/entities/contest-attempt-entity';

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
      about: data.about,
      domain: data.domain,
      suggestionLevel: data.suggestionLevel,
      globalScore: data.globalScore,
      subscription: data.subscription,
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
      ...(data.domain && { domain: data.domain }),
      ...(data.suggestionLevel && { suggestionLevel: data.suggestionLevel }),
      ...(data.globalScore && { globalScore: data.globalScore }),
      ...(data.subscription && { subscription: data.subscription }),
      ...(data.isProfileComplete && {
        isProfileComplete: data.isProfileComplete,
      }),
      ...(data.level && { level: data.level }),
      ...(data.notification && { notification: data.notification }),
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

export const accountRepositoryMapper = {
  toEntity(data: IAccountsModel): IAccountsEntity {
    return {
      email: data.email,
      name: data.name,
      password: data.password,
      _id: String(data._id),
      authProvider: data.authProvider,
      isVerified: data.isVerified,
      profileUrl: data.profileUrl || '',
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
      skillsIds: data.skillsIds?.map((s) =>
        s instanceof Types.ObjectId ? String(s) : (s as ISkillEntity)
      ),
      view: data.view,
      addedLanguagesId: data.addedLanguagesId?.map((l) =>
        l instanceof Types.ObjectId ? String(l) : (l as ILanguageEntity)
      ),
      problemNumber: data.problemNumber,
      validatorType: data.validatorType,
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
      ...(data.addedLanguagesId && {
        addedLanguagesId: data.addedLanguagesId.map((l) => new Types.ObjectId(String(l))),
      }),
      ...(data.validatorType && { validatorType: data.validatorType }),
      ...(data.problemNumber && { problemNumber: data.problemNumber }),
    };
  },
};

export const domainRepositoryMapper = {
  toModel(data: Partial<IDomainEntity>): Partial<IDomainModel> {
    return {
      title: data.title,
    };
  },
  toEntity(data: IDomainModel): IDomainEntity {
    return {
      title: data.title,
      _id: String(data._id),
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  },
};

export const skillRepositoryMapper = {
  toModel(data: Partial<ISkillEntity>): Partial<ISkillModel> {
    return {
      title: data.title,
    };
  },
  toEntity(data: ISkillModel): ISkillEntity {
    return {
      title: data.title,
      _id: String(data._id),
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  },
};

export const langaugeRepositoryMapper = {
  toModel(data: Partial<ILanguageEntity>): Partial<ILanguageModel> {
    return {
      ...(data.language && { language: data.language }),
      ...(data.functionName && { functionName: data.functionName }),
      ...(data.solution && { solution: data.solution }),
      ...(data.templateCode && { templateCode: data.templateCode }),
    };
  },
  toEntity(data: ILanguageModel): ILanguageEntity {
    return {
      language: data.language,
      _id: String(data._id),
      functionName: data.functionName,
      solution: data.solution,
      templateCode: data.templateCode,
    };
  },
};

export const testcaseRepositoryMapper = {
  toModel(data: Partial<ITestcaseEntity>): Partial<ITestcaseModel> {
    return {
      input: data.input,
      output: data.output,
      problemId: new Types.ObjectId(data.problemId),
      example: data.example,
    };
  },
  toEntity(data: ITestcaseModel): ITestcaseEntity {
    return {
      _id: String(data._id),
      input: data.input,
      output: data.output,
      problemId: String(data.problemId),
      example: data.example,
    };
  },
};

export const contestRepositoryMapper = {
  toEntity(data: IContestModel): IContestEntity {
    return {
      _id: String(data._id),
      title: data.title,
      description: data.description,
      domainId:
        data.domainId instanceof Types.ObjectId
          ? String(data.domainId)
          : (data.domainId as IDomainEntity),
      skillsIds: data.skillsIds.map((skill) =>
        skill instanceof Types.ObjectId ? String(skill) : (skill as ISkillEntity)
      ),
      problemsIds: data.problemsIds.map((problem) =>
        problem instanceof Types.ObjectId ? String(problem) : (problem as IProblemEntity)
      ),
      rewards: data.rewards,
      dateAndTime: data.dateAndTime,
      duration: data.duration,
      view: data.view,
      creatorId:
        data.creatorId instanceof Types.ObjectId
          ? String(data.creatorId)
          : (data.creatorId as IAccountsEntity),
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      endDateAndTime: data.endDateAndTime,
    };
  },
  toModel(data: Partial<IContestEntity>): Partial<IContestModel> {
    return {
      ...(data.title && { title: data.title }),
      ...(data.description && { description: data.description }),
      ...(data.domainId && {
        domainId: new Types.ObjectId(String(data.domainId)),
      }),
      ...(data.skillsIds && {
        skillsIds: data.skillsIds.map((skill) => new Types.ObjectId(String(skill))),
      }),
      ...(data.problemsIds && {
        problemsIds: data.problemsIds.map((problem) => new Types.ObjectId(String(problem))),
      }),
      ...(data.rewards && { rewards: data.rewards }),
      ...(data.dateAndTime && { dateAndTime: data.dateAndTime }),
      ...(data.duration && { duration: data.duration }),
      ...(data.view && { view: data.view }),
      ...(data.creatorId && {
        creatorId: new Types.ObjectId(String(data.creatorId)),
      }),
      ...(data.endDateAndTime && { endDateAndTime: data.endDateAndTime }),
    };
  },
};

export const followerRepositoryMapper = {
  toEntity(data: IFollowerModel): IFollowerEntity {
    return {
      _id: String(data._id),
      followerId: String(data.followerId),
      followeeId: String(data.followeeId),
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  },
  toModel(data: Partial<IFollowerEntity>): Partial<IFollowerModel> {
    return {
      ...(data.followerId && { followerId: new Types.ObjectId(String(data.followerId)) }),
      ...(data.followeeId && { followeeId: new Types.ObjectId(String(data.followeeId)) }),
    };
  },
};

export const submitProblemRepositoryMapper = {
  toEntity(data: ISubmitProblemModel): ISubmitProblemEntity {
    return {
      _id: String(data._id),
      userId: String(data.userId),
      problemId: String(data.problemId),
      solution: data.solution,
      language: data.language,
      status: data.status,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  },
  toModel(data: Partial<ISubmitProblemEntity>): Partial<ISubmitProblemModel> {
    return {
      ...(data.userId && { userId: new Types.ObjectId(String(data.userId)) }),
      ...(data.problemId && { problemId: new Types.ObjectId(String(data.problemId)) }),
      ...(data.solution && { solution: data.solution }),
      ...(data.language && { language: data.language }),
      ...(data.status && { status: data.status }),
    };
  },
};

export const planRepositoryMapper = {
  toEntity(data: IPlanModel): IPlanEntity {
    return {
      _id: String(data._id),
      name: data.name,
      price: data.price,
      durationInMonths: data.durationInMonths,
      description: data.description,
      features: data.features,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  },
  toModel(data: Partial<IPlanEntity>): Partial<IPlanModel> {
    return {
      ...(data.name && { name: data.name }),
      ...(data.price && { price: data.price }),
      ...(data.durationInMonths && { durationInMonths: data.durationInMonths }),
      ...(data.description && { description: data.description }),
      ...(data.features && { features: data.features }),
    };
  },
};

export const paymentRepositoryMapper = {
  toEntity(data: IPaymentModel): IPaymentEntity {
    return {
      _id: String(data._id),
      userId:
        data.userId instanceof Types.ObjectId
          ? String(data.userId)
          : (data.userId as IAccountsEntity),
      planId:
        data.planId instanceof Types.ObjectId ? String(data.planId) : (data.planId as IPlanEntity),
      razorpayOrderId: data.razorpayOrderId,
      razorpayPaymentId: data.razorpayPaymentId,
      amount: data.amount,
      currency: data.currency,
      status: data.status,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  },
  toModel(data: Partial<IPaymentEntity>): Partial<IPaymentModel> {
    return {
      ...(data.userId && { userId: new Types.ObjectId(String(data.userId)) }),
      ...(data.planId && { planId: new Types.ObjectId(String(data.planId)) }),
      ...(data.razorpayOrderId && { razorpayOrderId: data.razorpayOrderId }),
      ...(data.razorpayPaymentId && { razorpayPaymentId: data.razorpayPaymentId }),
      ...(data.amount && { amount: data.amount }),
      ...(data.currency && { currency: data.currency }),
      ...(data.status && { status: data.status }),
    };
  },
};

export const contestAttemptRepositoryMapper = {
  toEntity(data: IContestAttemptModel): IContestAttemptEntity {
    return {
      _id: String(data._id),
      contestId:
        data.contestId instanceof Types.ObjectId
          ? String(data.contestId)
          : (data.contestId as IContestEntity),
      userId:
        data.userId instanceof Types.ObjectId
          ? String(data.userId)
          : (data.userId as IUserEntity),
      score: data.score,
      totalProblems: data.totalProblems,
      solvedProblems: data.solvedProblems,
      totalSubmissions: data.totalSubmissions,
      startDateAndTime: data.startDateAndTime,
      endDateAndTime: data.endDateAndTime,
    };
  },
  toModel(data: Partial<IContestAttemptEntity>): Partial<IContestAttemptModel> {
    return {
      ...(data.contestId && { contestId: new Types.ObjectId(String(data.contestId)) }),
      ...(data.userId && { userId: new Types.ObjectId(String(data.userId)) }),
      ...(data.score && { score: data.score }),
      ...(data.totalProblems && { totalProblems: data.totalProblems }),
      ...(data.solvedProblems && { solvedProblems: data.solvedProblems }),
      ...(data.totalSubmissions && { totalSubmissions: data.totalSubmissions }),
      ...(data.startDateAndTime && { startDateAndTime: data.startDateAndTime }),
      ...(data.endDateAndTime && { endDateAndTime: data.endDateAndTime }),
    };
  },
};