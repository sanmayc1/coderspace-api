import { TDifficulty, TView } from "../../shared/constant.js";
import { IDomainEntity } from "./domain-entity.js";
import { ISkillEntity } from "./skill-entity.js";



export interface IProblemEntity {
  _id?: string;
  problemNumber?: number;
  title: string;
  description: string;
  constraints: string;
  difficulty: TDifficulty;
  skillsIds: (string | ISkillEntity)[];
  examples: IExample[]
  domainId: string | IDomainEntity;
  view: TView;
  isPremium: boolean;
}


export interface IExample{
  input:string
  output:string
  explanation:string
}