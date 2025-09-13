import {
  COOKIES_NAMES,
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
  CustomError,
  ILoginUserUsecase,
  IRegisterUserUsecase,
  ISendOtpUsecase,
  IVerifyOtpUsecase,
  Request,
  Response,
  UserSchema,
  inject,
  injectable,
  setCookies,
  IRefreshTokenUsecase,
  ILogoutUsecase,
  IForgetPasswordUsecase,
  ISendRestPasswordLink,
  passwordSchema,
  IAuthUserUsecase,
  IJwtPayload,
  LoginSchema,
  commonResponse,
} from "./index.js";

@injectable()
export class AuthController {
  constructor(
    @inject("IUserRegisterUsecase")
    private _registerUsecase: IRegisterUserUsecase,
    @inject("ISendOtpUsecase") private _sendOtpUsecase: ISendOtpUsecase,
    @inject("IVerifyOtpUsecase") private _verifyOtpUsecase: IVerifyOtpUsecase,
    @inject("ILoginUserUsecase") private _loginUserUsecase: ILoginUserUsecase,
    @inject("IRefreshTokenUsecase")
    private _refreshTokenUsecase: IRefreshTokenUsecase,
    @inject("ILogoutUsecase") private _logoutUsecase: ILogoutUsecase,
    @inject("ISendRestPasswordLink")
    private _sendRestPasswordLink: ISendRestPasswordLink,
    @inject("IForgetPasswordUsecase")
    private _forgetPassword: IForgetPasswordUsecase,
    @inject("IAuthUserUsecase") private _authUserUsecase: IAuthUserUsecase
  ) {}

  // Signup Controller

  async signup(req: Request, res: Response) {
    const validated = UserSchema.parse({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });

    const email = await this._registerUsecase.execute(validated);

    setCookies(res, COOKIES_NAMES.SIGNUP, email, true);
    res
      .status(HTTP_STATUS.CREATED)
      .json(commonResponse(true, SUCCESS_MESSAGES.USER_REGISTERED));
  }

  // Send OTP Controller

  async sendOtp(req: Request, res: Response) {
    const email = req.signedCookies[COOKIES_NAMES.SIGNUP];
    if (!email) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.NO_COOKIES);
    }
    await this._sendOtpUsecase.execute(email);
    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.SEND_OTP_TO_MAIL));
  }

  // Verify OTP Controller

  async verifyOtp(req: Request, res: Response) {
    const email = req.signedCookies[COOKIES_NAMES.SIGNUP];
    if (!email) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.NO_COOKIES);
    }
    const otp = req.body.otp;
    await this._verifyOtpUsecase.execute(email, otp);
    res.clearCookie(COOKIES_NAMES.SIGNUP);
    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.OTP_VERIFIED));
  }

  // Login Controller

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const validated = LoginSchema.parse({ email, password });

    const data = await this._loginUserUsecase.execute(validated);

    setCookies(res, COOKIES_NAMES.ACCESS_TOKEN, data.accessToken);
    setCookies(res, COOKIES_NAMES.REFRESH_TOKEN, data.refreshToken);
    setCookies(res, COOKIES_NAMES.DEVICE_ID, data.deviceId, true);

    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.USER_LOGIN, data.response));
  }

  // Token refresh Controller

  async tokenRefresh(req: Request, res: Response) {
    const token = req.cookies[COOKIES_NAMES.REFRESH_TOKEN];
    const deviceId = req.signedCookies[COOKIES_NAMES.DEVICE_ID];
    const { accessToken, refreshToken } =
      await this._refreshTokenUsecase.execute(token, deviceId);

    setCookies(res, COOKIES_NAMES.ACCESS_TOKEN, accessToken);
    setCookies(res, COOKIES_NAMES.REFRESH_TOKEN, refreshToken);
    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.TOKEN_REFRESH));
  }

  // Logout User

  async logout(req: Request, res: Response) {
    const refreshToken = req.cookies[COOKIES_NAMES.REFRESH_TOKEN];
    const accessToken = req.cookies[COOKIES_NAMES.ACCESS_TOKEN];
    const deviceId = req.signedCookies[COOKIES_NAMES.DEVICE_ID];

    await this._logoutUsecase.executes(refreshToken, accessToken, deviceId);

    res.clearCookie(COOKIES_NAMES.ACCESS_TOKEN);
    res.clearCookie(COOKIES_NAMES.REFRESH_TOKEN);
    res.clearCookie(COOKIES_NAMES.DEVICE_ID);
    res
      .status(HTTP_STATUS.NO_CONTENT)
      .json(commonResponse(true, SUCCESS_MESSAGES.LOGOUT));
  }

  async forgetPasword(req: Request, res: Response) {
    const email = req.body.email;
    await this._sendRestPasswordLink.execute(email);
    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.SEND_PASSWORD_REST_LINK));
  }

  async resetPassword(req: Request, res: Response) {
    const password = passwordSchema.parse(req.body.newPassword);
    const token = req.body.token;

    await this._forgetPassword.execute(token, password);
    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.PASSWORD_REST));
  }

  async authenticatedUser(req: Request, res: Response) {
    const response = await this._authUserUsecase.execute(req.user as IJwtPayload);
    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.ACCOUNT_DETAILS, response));
  }
}
