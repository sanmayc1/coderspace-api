import {
  COOKIES_NAMES,
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../../../shared/constant.js";
import type { IRegisterUserUsecase } from "../../../entities/useCaseInterfaces/auth/register-usecase.interface.js";
import { setCookies } from "../../../shared/utils/cookie-helper.js";
import type { ISendOtpUsecase } from "../../../entities/useCaseInterfaces/auth/send-otp.usecase.js";
import type { IVerifyOtpUsecase } from "../../../entities/useCaseInterfaces/auth/verify-otp.usecase.interface.js";
import { CustomError } from "../../../entities/utils/errors/custom-error.js";
import type { ILoginUserUsecase } from "../../../entities/useCaseInterfaces/auth/login-user.usecase.interface.js";
import { inject, injectable } from "tsyringe";
import type { Request, Response } from "express";
import type { UserRegisterRequestDto } from "../../../useCases/auth/dtos/auth.dto.js";
import { UserSchema } from "./validation/user-validation-schema.js";
import { UserMapper } from "../../../useCases/auth/mappers/user.mapper.js";
import type { IRefreshTokenUsecase } from "../../../entities/useCaseInterfaces/auth/refresh-token.usecase.interface.js"; 
import type { ILogoutUsecase } from "../../../entities/useCaseInterfaces/auth/logout.usecase.interface.js";
import type { IForgetPasswordUsecase } from "../../../entities/useCaseInterfaces/auth/forget-password.usecase.interface.js";
import type { ISendRestPasswordLink } from "../../../entities/useCaseInterfaces/auth/send-reset-link.js";
import { passwordSchema } from "../../../shared/validation/schema.js";
import crypto from "crypto"
import { config } from "../../../shared/config.js";
import type { IGithHubAuthUsecase } from "../../../entities/useCaseInterfaces/auth/github-auth.usecase.interface.js";
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
  UserMapper as UserMapperController,
  UserRegisterRequestDto,
  UserSchema,
  IRefreshTokenUsecase,
  ILogoutUsecase,
  IForgetPasswordUsecase,
  ISendRestPasswordLink,
  passwordSchema,
  crypto,
  config,
  IGithHubAuthUsecase

};
