import { TDifficulty, TLanguages, TView } from "../../shared/constant.js";
import { IDomainEntity } from "./domain-entity.js";
import { ILanguageEntity } from "./langauge-entity.js";
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
  addedLanguagesId:(string|ILanguageEntity)[]
}


export interface IExample{
  id?:string
  input:string
  output:string
  explanation:string
}