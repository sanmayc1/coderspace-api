import { TLanguages } from '../../shared/constant';

export interface ILanguageEntity {
  _id?: string;
  language: TLanguages;
  templateCode?: string;
  solution?: string;
  functionName?: string;
}
