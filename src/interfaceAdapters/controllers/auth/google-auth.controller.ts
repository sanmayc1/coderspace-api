import { IGoogleAuthUsecaseInputDto } from "../../../useCases/dtos/auth.dto.js";
import { IGoogleAuthUsecase } from "../../../useCases/Interfaces/auth/google-auth.usecase.interface.js";
import {
  Request,
  Response,
  config,
  setCookies,
  COOKIES_NAMES,
  injectable,
  inject,
  HTTP_STATUS,
} from "./index.js";

@injectable()
export class GoogleAuthController {
  constructor(
    @inject("IGoogleAuthUsecase") private _googleAuthUsecase: IGoogleAuthUsecase
  ) {}

  async googleAuth(req: Request, res: Response) {
    const userProfile = req.user as IGoogleAuthUsecaseInputDto;

    const data = await this._googleAuthUsecase.execute(userProfile);

    if (data.statusCode !== HTTP_STATUS.OK) {
      res.redirect(`${config.client.uri}/user/login?error=${data.message}`);
      return;
    }

    setCookies(res, COOKIES_NAMES.ACCESS_TOKEN, data.accessToken as string);
    setCookies(res, COOKIES_NAMES.REFRESH_TOKEN,data.refreshToken as string );
    setCookies(res, COOKIES_NAMES.DEVICE_ID, data.deviceId as string);

    res.redirect(`${config.client.uri}`);
  }
}
