import { IContestEntity } from "../entities/contest-entity.js";
import { IBaseRepository } from "./base-repository.interface.js";

export interface IContestRepository extends IBaseRepository<IContestEntity> {
  getCompanyContests(
    data: IGetCompanyContestInput
  ): Promise<ICompanyContestList>;
}

export interface IGetCompanyContestInput {
  creatorId: string;
  search?: string;
  limit: number;
  skip: number;
}

export interface ICompanyContestList {
  contests: IContestEntity[];
  total: number;
}

