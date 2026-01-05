import {
  COOKIES_NAMES,
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from '../../../shared/constant';
import type { IRegisterUserUsecase } from '../../../useCases/Interfaces/auth/register-user-usecase.interface';
import { setCookies } from '../../../shared/utils/cookie-helper';
import type { ISendOtpUsecase } from '../../../useCases/Interfaces/auth/send-otp.usecase';
import type { IVerifyOtpUsecase } from '../../../useCases/Interfaces/auth/verify-otp.usecase.interface';
import { CustomError } from '../../../domain/utils/custom-error';
import type { ILoginUserUsecase } from '../../../useCases/Interfaces/auth/login-user.usecase.interface';
import { inject, injectable } from 'tsyringe';
import type { Request, Response } from 'express';
import type { RegisterUserRequestDto } from '../../../useCases/dtos/auth.dto';
import { UserSchema } from './validation/user-validation-schema';
import type { IRefreshTokenUsecase } from '../../../useCases/Interfaces/auth/refresh-token.usecase.interface';
import type { ILogoutUsecase } from '../../../useCases/Interfaces/auth/logout.usecase.interface';
import type { IForgetPasswordUsecase } from '../../../useCases/Interfaces/auth/forget-password.usecase.interface';
import type { ISendRestPasswordLink } from '../../../useCases/Interfaces/auth/send-reset-link';
import { passwordSchema } from '../../../shared/validation/schema';
import crypto from 'crypto';
import { config } from '../../../shared/config';
import type { IGithHubAuthUsecase } from '../../../useCases/Interfaces/auth/github-auth.usecase.interface';
import type { IJwtPayload } from '../../../domain/entities/jwt-payload.enitity';
import type { IAuthUserUsecase } from '../../../useCases/Interfaces/auth/auth-user.usecase.interface';
import { LoginSchema } from './validation/user-validation-schema';
import { commonResponse } from '../../../shared/utils/common-response';
export {
  COOKIES_NAMES,
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
  IRegisterUserUsecase,
  setCookies,
  ISendOtpUsecase,
  IVerifyOtpUsecase,
  CustomError,
  ILoginUserUsecase,
  inject,
  injectable,
  Request,
  Response,
  RegisterUserRequestDto as UserRegisterRequestDto,
  UserSchema,
  IRefreshTokenUsecase,
  ILogoutUsecase,
  IForgetPasswordUsecase,
  ISendRestPasswordLink,
  passwordSchema,
  crypto,
  config,
  IGithHubAuthUsecase,
  IJwtPayload,
  IAuthUserUsecase,
  LoginSchema,
  commonResponse,
};
