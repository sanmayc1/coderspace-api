import { IContestEntity } from '../entities/contest-entity';
import { IProblemEntity } from '../entities/problem-entity';
import { IBaseRepository } from './base-repository.interface';
import { IMongoOptions } from './problem-repository.interface';

export interface IContestRepository extends IBaseRepository<IContestEntity> {
  getCompanyContests(data: IGetCompanyContestInput): Promise<ICompanyContestList>;
  getAllContests(data: IMongoOptions): Promise<{count:number,contests:IContestEntity[]}>;
  getContestWithAllDetails(id:string):Promise<IContestEntity | null>
  getAllProblemsOfContest(id:string):Promise<{problems:IProblemEntity[],endDateAndTime:Date}>
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
