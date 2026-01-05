import { IAccountsEntity } from '../../../domain/entities/accounts-entity';
import { ILoginUsecaseOutputDto } from '../../dtos/auth.dto';

export interface ILoginAdminUsecase {
  execute(data: Pick<IAccountsEntity, 'email' | 'password'>): Promise<ILoginUsecaseOutputDto>;
}
