import { TDifficulty } from "../../shared/constant.js";
import { IAccountsEntity } from "./accounts-entity.js";

interface PlanHistory {
  planId: string;
  planName: string;
  expireAt: Date;
}

export interface Rating {
  _id: string;
  rating: number;
}

export interface IUserEntity {
  _id?: string;
  accountId:string | IAccountsEntity 
  username: string;
  level?: number;
  xpCoin?: number;
  phone?: string;
  location?: string;
  dateOfBirth?: Date;
  githubUrl?: string;
  linkedinUrl?: string;
  globalScore?: number;
  notification?: boolean;
  badge?: "silver" | "gold" | "platinum";
  about?: string;
  isPremiumActive?: boolean;
  planHistory?: PlanHistory ;
  isProfileComplete?: boolean;
  domain?: Rating[] ;
  skills?: Rating[] ;
  suggestionLevel?:TDifficulty
  createdAt?: Date;
  updatedAt?: Date;
}
