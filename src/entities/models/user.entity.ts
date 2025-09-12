import { TRole } from "../../shared/constant.js";
import { IAccountsEntity } from "./accounts-entity.js";

interface PlanHistory {
  planId: string;
  planName: string;
  expireAt: Date;
}

interface Rating {
  _id: string;
  rating: number;
}

export interface IUserEntity {
  _id?: string;
  accountId:string | Pick<IAccountsEntity , "email">
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
  position?: string;
  experience?: number;
  domain?: Rating[] ;
  skills?: Rating[] ;
  profession?: string;
  createdAt?: Date;
  updtedAt?: Date;
}
