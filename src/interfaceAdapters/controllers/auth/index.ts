import {
  COOKIES_NAMES,
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../../../shared/constant.js";
import type { IRegisterUserUsecase } from "../../../useCases/Interfaces/auth/register-user-usecase.interface.js";
import { setCookies } from "../../../shared/utils/cookie-helper.js";
import type { ISendOtpUsecase } from "../../../useCases/Interfaces/auth/send-otp.usecase.js";
import type { IVerifyOtpUsecase } from "../../../useCases/Interfaces/auth/verify-otp.usecase.interface.js";
import { CustomError } from "../../../entities/utils/errors/custom-error.js";
import type { ILoginUserUsecase } from "../../../useCases/Interfaces/auth/login-user.usecase.interface.js";
import { inject, injectable } from "tsyringe";
import type { Request, Response } from "express";
import type { RegisterUserRequestDto } from "../../../useCases/dtos/auth.dto.js";
import { UserSchema } from "./validation/user-validation-schema.js";
import type { IRefreshTokenUsecase } from "../../../useCases/Interfaces/auth/refresh-token.usecase.interface.js"; 
import type { ILogoutUsecase } from "../../../useCases/Interfaces/auth/logout.usecase.interface.js";
import type { IForgetPasswordUsecase } from "../../../useCases/Interfaces/auth/forget-password.usecase.interface.js";
import type { ISendRestPasswordLink } from "../../../useCases/Interfaces/auth/send-reset-link.js";
import { passwordSchema } from "../../../shared/validation/schema.js";
import crypto from "crypto"
import { config } from "../../../shared/config.js";
import type { IGithHubAuthUsecase } from "../../../useCases/Interfaces/auth/github-auth.usecase.interface.js";
import type { IJwtPayload } from "../../../entities/models/jwt-payload.enitity.js";
import type { IAuthUserUsecase } from "../../../useCases/Interfaces/auth/auth-user.usecase.interface.js";
import { LoginSchema } from "./validation/user-validation-schema.js";
import { commonResponse } from "../../../shared/utils/common-response.js";
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
  commonResponse
};
