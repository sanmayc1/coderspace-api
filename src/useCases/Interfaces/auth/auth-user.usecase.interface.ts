import { IJwtPayload } from '../../../domain/entities/jwt-payload.enitity';
import { IAuthResponseDto } from '../../dtos/auth.dto';

export interface IAuthUserUsecase {
  execute(user: IJwtPayload): Promise<IAuthResponseDto>;
}
