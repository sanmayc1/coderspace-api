import { IContestEntity } from "./contest-entity";
import { IUserEntity } from "./user.entity";



export interface IContestAttemptEntity {
  _id: string;
  contestId: string |IContestEntity;
  userId: string |IUserEntity;
  score: number;
  totalProblems: number;
  solvedProblems: number;
  totalSubmissions: number;
  startDateAndTime: Date;
  endDateAndTime: Date;
}