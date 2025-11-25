import { GenericFilter, Projection, Sort } from "../../shared/constant.js";
import { IProblemEntity } from "../entities/problem-entity.js";
import { IBaseRepository } from "./base-repository.interface.js";

export interface IProblemRepository extends IBaseRepository<IProblemEntity> {
  findProblemCount(): Promise<number>;
  getAllProblems(data: IGetAllProblemsInput): Promise<IGetAllProblems>;
  addLanguage(id: string, languageId: string): Promise<void>;
  getProblem(id:string,options?:IGetProblemInput):Promise<IProblemEntity |null>
}

export interface IGetAllProblems {
  problems: IProblemEntity[];
  total: number;
}

export interface IGetAllProblemsInput {
  projections?: Projection;
  sort?: Sort;
  filter?: GenericFilter;
  relations?: string[];
  skip: number;
  limit: number;
}

export interface IGetProblemInput {
 
  projections?: Projection;
  relations?: string[];
}
