import { ILanguageEntity } from '../entities/langauge-entity';
import { IBaseRepository } from './base-repository.interface';

export interface ILanguageRepository extends IBaseRepository<ILanguageEntity> {
    getLanguageByProblemIdAndLanguage(id: string,langauge:string): Promise<ILanguageEntity | null>;
}
