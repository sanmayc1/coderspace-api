import { IDomainEntity } from "../../domain/entities/domain-entity.js";
import { IExample } from "../../domain/entities/problem-entity.js";
import { TBadge, TLanguages, TView } from "../../shared/constant.js";

export interface IGetUsersUsecaseOutputDto {
  page: number;
  totalPages: number;
  users: IGetUsersUsecaseUserDto[];
}

export interface IGetUsersUsecaseUserDto {
  username: string;
  email: string;
  level: number;
  badge: TBadge;
  userId: string;
  accountId: string;
  blocked: boolean;
  profileUrl?: string;
}

export interface IGetUsersUsecaseInputDto {
  page: number;
  sort: string;
  search?: string;
  limit: number;
  blocked?: boolean;
}

export interface IUpdateUserUsecaseInputDto {
  userId: string;
  badge: string;
  level: number;
}

export interface ICreateProblemUsecaseInputDto {
  title: string;
  description: string;
  difficulty: string;
  skills: string[];
  premium: boolean;
  domain: string;
  constrain: string;
  examples: IExample[];
}

export interface IContestRewardDto {
  rank: number;
  description: string;
}

export interface ICreateContestUsecaseInputDto {
  title: string;
  description: string;
  domain: string;
  skills: string[];
  problems: string[];
  rewards: IContestRewardDto[];
  dateAndTime: string;
  duration: number;
  visibility: TView;
}

export interface IGetAllDomainsUsecaseOutput {
  domains: IDomainDto[];
}

export interface IGetAllSkillsUsecaseOutput {
  skills: ISkillDto[];
}

export interface IDomainDto {
  id: string;
  title: string;
}

export interface ISkillDto {
  id: string;
  title: string;
}

export interface IGetAllProblemUsecaseInputDto {
  page: number;
  search: string;
  sortBy: string;
}

export interface IGetAllProblemUsecaseProblemDto {
  title: string;
  number: number;
  languages: { language: TLanguages; id: string }[];
  id: string;
  view: TView;
}

export interface IGetAllProblemUsecaseOutputDto {
  totalPages: number;
  currentPage: number;
  problems: IGetAllProblemUsecaseProblemDto[];
}

export interface IAddLanguageUsecaseInputDto {
  language: TLanguages;
  problemId: string;
}

export interface IGetLanguageDetailsUsecaseOutput {
  id: string;
  language: TLanguages;
  tmpCode: string;
  solution: string;
  fnName: string;
}

export interface IUpdateLanguageUsecaseInput {
  languageId: string;
  templateCode: string;
  fnName: string;
  solution: string;
}

export interface IAddSingleTestcaseInputDto {
  input: string;
  output: string;
  problemId: string;
  example?: boolean;
}

export interface IGetAllTestcaseUsecaseOutputDto {
  id: string;
  input: string;
  output: string;
  example?: boolean;
}


export interface IGetProblemUsecaseOutput{
  title: string;
  description: string;
  difficulty: string;
  skills: ISkillDto[];
  premium: boolean;
  domain: string;
  constrain: string;
  examples: IExample[];
}

export interface IUpdateProblemUsecaseInput extends ICreateProblemUsecaseInputDto {
  problemId:string
}



export interface IUserGetAllProblemsUsecaseOutput {
  problems:IUserGetAllProblem[]
  totalPages:number
  currentPage:number
}

export interface IUserGetAllProblem{
  title: string;
  number:number
  difficulty: string;
  skills: ISkillDto[];
  id:string
  premium:boolean
}


export interface IUserGetAllProblemsUsecaseInput {
   search:string,
   page:number,
   difficulty?:string,
   skill?:string
}

export interface ITemplateCodes{
  language:string
  id:string,
  templateCode:string
}


export interface IUserGetProblemUsecaseOutput extends IGetProblemUsecaseOutput{
  templateCodes:ITemplateCodes[]
  number:number
}