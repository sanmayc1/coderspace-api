import { IAuthResponseDto } from "../dtos/auth.dto.js"; 


export const registerUserUsecaseMapper = {
  toResponse({
    id,
    email,
    isProfileComplete,
    profileUrl
  }: {
    id: string;
    email: string;
    isProfileComplete: boolean;
    profileUrl:string

  }): IAuthResponseDto {
    return {
      accountId: id,
      email,
      profileComplete: isProfileComplete,
      profileUrl
    };
  },
};
