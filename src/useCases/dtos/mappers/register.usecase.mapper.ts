import { IAccountsEntity } from '../../../domain/entities/accounts-entity';
import { IUserEntity } from '../../../domain/entities/user.entity';
import { TRole } from '../../../shared/constant';
import { IAuthResponseDto } from '../auth.dto';

export const LoginUsecaseMapper = {
  toResponse(account: IAccountsEntity, user?: IUserEntity): IAuthResponseDto {
    return {
      accountId: account._id as string,
      email: account.email,
      profileComplete: user?.isProfileComplete as boolean,
      profileUrl: account.profileUrl || '',
      role: account.role as TRole,
    };
  },
};
