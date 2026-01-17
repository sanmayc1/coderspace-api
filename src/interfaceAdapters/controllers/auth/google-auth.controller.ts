import { IGoogleAuthUsecaseInputDto } from '../../../useCases/dtos/auth.dto';
import { IGoogleAuthUsecase } from '../../../useCases/Interfaces/auth/google-auth.usecase.interface';
import {
  Request,
  Response,
  config,
  setCookies,
  COOKIES_NAMES,
  injectable,
  inject,
  HTTP_STATUS,
} from './index';

@injectable()
export class GoogleAuthController {
  constructor(@inject('IGoogleAuthUsecase') private _googleAuthUsecase: IGoogleAuthUsecase) {}

  async googleAuth(req: Request, res: Response) {
    const userProfile = req.user as unknown as IGoogleAuthUsecaseInputDto;

    const data = await this._googleAuthUsecase.execute(userProfile);

    if (data.statusCode !== HTTP_STATUS.OK) {
      res.redirect(`${config.client.uri}/user/login?error=${data.message}`);
      return;
    }

    setCookies(res, COOKIES_NAMES.ACCESS_TOKEN, data.accessToken as string);
    setCookies(res, COOKIES_NAMES.REFRESH_TOKEN, data.refreshToken as string);
    setCookies(res, COOKIES_NAMES.DEVICE_ID, data.deviceId as string, true);

    res.redirect(`${config.client.uri}`);
  }
}
