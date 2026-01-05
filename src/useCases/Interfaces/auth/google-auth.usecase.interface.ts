import { IAuthProviderUsecaseOutputDto, IGoogleAuthUsecaseInputDto } from '../../dtos/auth.dto';

export interface IGoogleAuthUsecase {
  execute(data: IGoogleAuthUsecaseInputDto): Promise<IAuthProviderUsecaseOutputDto>;
}
