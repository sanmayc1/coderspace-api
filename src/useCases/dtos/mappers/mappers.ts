import { IAccountsEntity } from "../../../domain/entities/accounts-entity.js";
import { ICompanyEntity } from "../../../domain/entities/company-entity.js";
import { IDomainEntity } from "../../../domain/entities/domain-entity.js";
import { ILanguageEntity } from "../../../domain/entities/langauge-entity.js";
import { IProblemEntity } from "../../../domain/entities/problem-entity.js";
import { ISkillEntity } from "../../../domain/entities/skill-entity.js";
import { ITestcaseEntity } from "../../../domain/entities/testcase-entity.js";
import { IUserEntity } from "../../../domain/entities/user.entity.js";
import { TBadge, TLanguages, TRole } from "../../../shared/constant.js";
import {
  IDomainDto,
  IGetAllProblemUsecaseOutputDto,
  IGetAllTestcaseUsecaseOutputDto,
  IGetLanguageDetailsUsecaseOutput,
  IGetProblemUsecaseOutput,
  IGetUsersUsecaseOutputDto,
  IGetUsersUsecaseUserDto,
  ISkillDto,
  IUserGetAllProblem,
  IUserGetAllProblemsUsecaseOutput,
  IUserGetProblemUsecaseOutput,
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
        languages: (s.addedLanguagesId as ILanguageEntity[]).map((l) => ({
          language: l.language,
          id: String(l._id),
        })),
        id: s._id as string,
        number: s.problemNumber as number,
        title: s.title,
        view: s.view,
      })),
    };
  },
};

export const getLanguageDetailsUsecaseMapper = {
  toResponse(data: ILanguageEntity): IGetLanguageDetailsUsecaseOutput {
    return {
      id: String(data._id),
      language: data.language,
      fnName: data.functionName as string,
      solution: data.solution as string,
      tmpCode: data.templateCode as string,
    };
  },
};

export const getAllTestcaseUsecaseMapper = {
  toRespone(data: ITestcaseEntity): IGetAllTestcaseUsecaseOutputDto {
    return {
      id: data._id as string,
      input: data.input,
      output: data.output,
      ...(data.example ? { example: data.example } : {}),
    };
  },
};

export const getProblemUsecaseMapper = {
  toResponse(data: IProblemEntity): IGetProblemUsecaseOutput {
    return {
      constrain: data.constraints,
      description: data.description,
      difficulty: data.difficulty,
      domain: String(data.domainId),
      examples: data.examples.map((e) => ({
        explanation: e.explanation,
        input: e.input,
        output: e.output,
        id: e.id,
      })),
      premium: data.isPremium,
      skills: (data.skillsIds as ISkillEntity[]).map((s) => ({
        id: String(s._id),
        title: s.title,
      })),
      title: data.title,
    };
  },
};

export const userGetAllProblemsUsecaseMapper = {
  toResponse(data: IProblemEntity): IUserGetAllProblem {
    return {
      difficulty: data.difficulty,
      id: data._id as string,
      number: data.problemNumber as number,
      skills: (data.skillsIds as ISkillEntity[]).map((s) => ({
        id: String(s._id),
        title: s.title,
      })),
      premium:data.isPremium,
      title: data.title,
    };
  },
};

export const userGetProblemUsecaseMapper = {
  toResponse(data: IProblemEntity): IUserGetProblemUsecaseOutput {
    return {
      constrain: data.constraints,
      description: data.description,
      difficulty: data.difficulty,
      domain: data.domainId as string,
      examples: data.examples,
      premium: data.isPremium,
      number: data.problemNumber as number,
      skills: (data.skillsIds as ISkillEntity[]).map((s) => ({
        id: String(s._id),
        title: s.title,
      })),
      templateCodes: (data.addedLanguagesId as ILanguageEntity[]).map((l) => ({
        id: String(l._id),
        language: l.language,
        templateCode: String(l.templateCode),
      })),
      title:data.title
    };
  },
};
