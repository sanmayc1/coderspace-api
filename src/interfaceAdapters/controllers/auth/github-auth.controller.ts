import {
  Request,
  Response,
  crypto,
  config,
  setCookies,
  COOKIES_NAMES,
  injectable,
  inject,
  IGithHubAuthUsecase,
  HTTP_STATUS,
} from "./index.js";

@injectable()
export class GithHubAuthController {
  constructor(
    @inject("IGithHubAuthUsecase")
    private _githubAuthUsecase: IGithHubAuthUsecase
  ) {}

  redirectToGithub(req: Request, res: Response) {
    const randomString = crypto.randomBytes(50).toString("hex");

    const url = `${config.github.redirectUrl}?client_id=${config.github.clientId}&redirect_uri=${config.github.calllbackUrl}&scope=user&state=${randomString}`;
    setCookies(res, COOKIES_NAMES.GITHUB_SESSION, randomString, true, "none");

    res.redirect(url);
  }

  async githubAuth(req: Request, res: Response) {
    const sessionState = req.signedCookies[COOKIES_NAMES.GITHUB_SESSION];
    const state = req.query.state as string;
    const code = req.query.code as string;

    const data = await this._githubAuthUsecase.execute(
      sessionState,
      state,
      code
    );

    if (data.statusCode !== HTTP_STATUS.OK) {
      res.redirect(`${config.client.uri}/auth/login?error=${data.message}`);
      return 
    }

    res.clearCookie(COOKIES_NAMES.GITHUB_SESSION)

    setCookies(res, COOKIES_NAMES.ACCESS_TOKEN, data.accessToken as string);
    setCookies(res, COOKIES_NAMES.REFRESH_TOKEN, data.refreshToken as string);
    setCookies(res, COOKIES_NAMES.DEVICE_ID, data.deviceId as string, true);

    res.redirect(`${config.client.uri}`);
  }
}
