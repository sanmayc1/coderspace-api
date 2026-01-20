import { TDifficulty, TView } from '../../shared/constant';
import { IDomainEntity } from './domain-entity';
import { ILanguageEntity } from './langauge-entity';
import { ISkillEntity } from './skill-entity';

export interface IProblemEntity {
  _id?: string;
  problemNumber?: number;
  title: string;
  description: string;
  constraints: string;
  difficulty: TDifficulty;
  skillsIds: (string | ISkillEntity)[];
  examples: IExample[];
  domainId: string | IDomainEntity;
  view: TView;
  isPremium: boolean;
  validatorType: string;
  addedLanguagesId: (string | ILanguageEntity)[];
}

export interface IExample {
  id?: string;
  input: string;
  output: string;
  explanation: string;
}
