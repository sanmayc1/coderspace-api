import { inject, injectable } from "tsyringe";
import type { IRegisterUserUsecase } from "../../../entities/useCaseInterfaces/auth/register-usecase.interface.js";
import { NextFunction, Request, Response } from "express";
import { UserRegisterRequestDto } from "../../dtos/auth.dto.js";
import { UserSchema } from "./validation/user-register-validation-schema.js";
import { UserMapperController } from "../../mappers/user.mapper.js";
import {
  COOKIES_NAMES,
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../../../shared/constant.js";
import { setCookies } from "../../../shared/utils/cookie-helper.js";
import { ISendOtpUsecase } from "../../../entities/useCaseInterfaces/auth/sendOtp.usecase.js";
import { IVerifyOtpUsecase } from "../../../entities/useCaseInterfaces/auth/verifyOtp.usecase.interface.js";
import { CustomError } from "../../../entities/utils/errors/custom-error.js";
import { ILoginUserUsecase } from "../../../entities/useCaseInterfaces/auth/loginUser.usecase.interface.js";

@injectable()
export class AuthController {
  constructor(
    @inject("IUserRegisterUsecase")
    private _registerUsecase: IRegisterUserUsecase,
    @inject("ISendOtpUsecase") private _sendOtpUsecase: ISendOtpUsecase,
    @inject("IVerifyOtpUsecase") private _verifyOtpUsecase: IVerifyOtpUsecase,
    @inject("ILoginUserUsecase") private _loginUserUsecase: ILoginUserUsecase){}

  async signup(req: Request, res: Response, next: NextFunction) {
    const dto: UserRegisterRequestDto = UserSchema.parse(req.body);
    const userEntity = UserMapperController.toEntity(dto);
    const email = await this._registerUsecase.execute(userEntity);
    setCookies(res, COOKIES_NAMES.SIGNUP, email, true);
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: SUCCESS_MESSAGES.USER_REGISTERED });
  }

  async sendOtp(req: Request, res: Response, next: NextFunction) {
    const email = req.signedCookies[COOKIES_NAMES.SIGNUP];
    if (!email) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.NO_COOKIES);
    }
    await this._sendOtpUsecase.execute(email);
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: SUCCESS_MESSAGES.SEND_OTP_TO_MAIL });
  }

  async verifyOtp(req: Request, res: Response, next: NextFunction) {
    const email = req.signedCookies[COOKIES_NAMES.SIGNUP];
    if (!email) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.NO_COOKIES);
    }
    const otp = req.body.otp;
    await this._verifyOtpUsecase.execute(email, otp);
    res.clearCookie(COOKIES_NAMES.SIGNUP);
    res
      .status(200)
      .json({ success: true, message: SUCCESS_MESSAGES.OTP_VERIFIED });
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const {email,password} = req.body
    await this._loginUserUsecase.execute(email,password)
   
  }
}
