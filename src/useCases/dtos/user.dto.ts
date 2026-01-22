import { int } from 'zod';
import { Rating } from '../../domain/entities/user.entity';
import { TDifficulty } from '../../shared/constant';
import { IContestRewardDto, ISkillDto, ITemplateCodes } from './admin.dto';
import { IExample } from '../../domain/entities/problem-entity';
import { ILeaderboardUserDTO } from '../../domain/repositoryInterfaces/contest-attempt-repository.interface';

export interface IGetUserUsecaseOutputDto {
  id: string;
  name: string;
  username: string;
  xpCoin: number;
  currentLevel: number;
  currentBadge: string;
  following: number;
  followers: number;
  accountId: string;
  about?: string;
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
  userId: string;
  name: string;
  username: string;
  badge: string;
  profileUrl: string;
  isFollowing: boolean;
}

export interface IGetCoderUsecaseOutputDto {
  userId: string;
  name: string;
  username: string;
  badge: string;
  level: number;
  following: number;
  followers: number;
  about?: string;
  joinDate: string;
  problemSolved: number;
  profileUrl: string;
  isFollowing: boolean;
}

export interface ISubmitProblemUsecaseOutputDto {
  testcases: {
    input: string;
    output: string;
    expected: string;
    isCorrect: boolean;
  }[];
  success: boolean;
}

export interface ISubmitProblemUsecaseInputDto {
  problemId: string;
  solution: string;
  language: string;
  accountId: string;
}



export interface IGetProblemUpdatesUsecaseInputDto {
  accountId: string;
  problemId: string;
  language: string;
}

export interface IGetProblemUpdatesUsecaseOutputDto {
  status: string;
  solution: string;
  language: string;
}

export interface IRunProblemUsecaseOutputDto {
  testcases: {
    input: string;
    output: string;
    expected: string;
    isCorrect: boolean;
  }[];
  success: boolean;
}

export interface IGetAllPlansUsecaseOutputDto {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  duration: string;
}

export interface ICreateRazorpayOrderUsecaseOutputDto {
  orderId: string;
  amount: string;
  currency: string;
  name: string;
  email: string;
}

export interface ICreateRazorpayOrderUsecaseInputDto {
  planId: string;
  accountId: string;
}

export interface IEditPlanInputDto {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  duration: string;
}

export interface IGetContestUsecase {
  id: string;
  title: string;
  description: string;
  dateAndTime: string;
  domain: string;
  skills: ISkillDto[];
  duration: string;
  rewards: IContestRewardDto[];
}

export interface IGetAllUpcomingAndOngoingContestUsecaseOutputDto {
  contests: IGetContestUsecase[];
  totalPages: number;
  currentPage: number;
}

export interface IGetAllPastContestUsecaseOutputDto {
  contests: IGetContestUsecase[];
  totalPages: number;
  currentPage: number;
}

export interface IGetContestProblem {
  id: string;
  templateCodes: ITemplateCodes[];
  number: number;
  testcases: { input: string; output: string; expected: string }[];
  title: string;
  description: string;
  difficulty: string;
  skills: ISkillDto[];
  premium: boolean;
  domain: string;
  constrain: string;
  examples: IExample[];
}

export interface IGetContestProblemUsecaseOutputDto {
  problems: IGetContestProblem[];
  endDateAndTime: Date;
}


export interface IContestProblemSubmitUsecaseOutputDto {
  testcases: {
    input: string;
    output: string;
    expected: string;
    isCorrect: boolean;
  }[];
  success: boolean;
}

export interface IContestProblemSubmitUsecaseInputDto {
  problemId: string;
  contestId: string;
  solution: string;
  language: string;
  accountId: string;
}

export interface IGetContestLeaderboardUsecaseOutputDto extends ILeaderboardUserDTO {
    
}