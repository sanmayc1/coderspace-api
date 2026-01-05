import { IAccountsEntity } from '../../../domain/entities/accounts-entity';
import { ILoginUsecaseOutputDto } from '../../dtos/auth.dto';

export interface ILoginCompanyUsecase {
  execute(data: Pick<IAccountsEntity, 'email' | 'password'>): Promise<ILoginUsecaseOutputDto>;
}
