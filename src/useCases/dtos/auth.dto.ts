import { ITokenEntity } from '../../domain/entities/token.entity';
import { TRole } from '../../shared/constant';

export interface RegisterUserRequestDto {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface ILoginUsecaseOutputDto extends ITokenEntity {
  deviceId: string;
  response: IAuthResponseDto;
}

export interface IAuthProviderUsecaseOutputDto {
  statusCode: number;
  message?: string;
  accessToken?: string;
  refreshToken?: string;
  deviceId?: string;
}

export interface IAuthResponseDto {
  accountId: string;
  email: string;
  profileComplete?: boolean;
  profileUrl: string;
  role: TRole;
}

export interface IGoogleAuthUsecaseInputDto {
  id?: string;
  displayName?: string;
  name?: {
    givenName?: string;
    familyName?: string;
  };
  emails: { value: string; verified?: boolean }[];
  photos?: { value: string }[];
}

export interface RegisterCompanyRequestDto {
  name: string;
  gstin: string;
  email: string;
  password: string;
}
