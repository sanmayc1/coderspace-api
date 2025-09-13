import { ITokenEntity } from "../../entities/models/token.entity.js";

export interface RegisterUserRequestDto {
  name: string;
  username: string;
  email: string;
  password: string;
}


export interface ILoginUserUsecaseOutputDto extends ITokenEntity {
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
  profileComplete: boolean;
  profileUrl: string;
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
