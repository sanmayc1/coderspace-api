import { LoginUserResponse } from "../../entities/useCaseInterfaces/auth/login-user.usecase.interface.js";


export const registerUserUsecaseMapper = {
  toResponse({
    id,
    email,
    isProfileComplete,
  }: {
    id: string;
    email: string;
    isProfileComplete: boolean;
  }): LoginUserResponse {
    return {
      accountId: id,
      email,
      profileComplete: isProfileComplete,
    };
  },
};
