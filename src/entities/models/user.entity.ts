import { ObjectId } from "mongoose";
import { TRole } from "../../shared/constant.js";

interface PlanHistory {
  planId: ObjectId;
  planName: string;
  expireAt: Date;
}

interface Rating {
  _id: ObjectId;
  rating: number;
}

export interface IUserEntity {
  _id?: ObjectId;
  name: string;
  email: string;
  username: string;
  profileUrl?: string;
  password: string;
  level?: number;
  xpCoin?: number;
  role?: TRole;
  phone?: string;
  location?: string;
  dateOfBirth?: Date;
  githubUrl?: string;
  linkedinUrl?: string;
  globalScore?: number;
  notification?: boolean;
  badge?: "silver" | "gold" | "platinum";
  authProvider?: "google" | "github" | "local";
  about?: string;
  isPremiumActive?: boolean;
  planHistory?: PlanHistory | [];
  isProfileComplete?: boolean;
  position?: string;
  experience?: number;
  domain?: Rating[] | [];
  skills?: Rating[] | [];
  profession?: string;
  createdAt?: Date;
  updtedAt?: Date;
}
