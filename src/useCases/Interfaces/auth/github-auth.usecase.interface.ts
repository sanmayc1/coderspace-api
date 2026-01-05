import { IAuthProviderUsecaseOutputDto } from '../../dtos/auth.dto';

export interface IGithHubAuthUsecase {
  execute(
    sessionState: string,
    state: string,
    code: string
  ): Promise<IAuthProviderUsecaseOutputDto>;
}
