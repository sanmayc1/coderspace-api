import {
  Request,
  Response,
  config,
  setCookies,
  COOKIES_NAMES,
  injectable,
  inject,
} from "./index.js";

@injectable()
export class GoogleAuthController {
  constructor(

  ) {}



  async googleAuth(req: Request, res: Response) {




    setCookies(res, COOKIES_NAMES.ACCESS_TOKEN, "" );
    setCookies(res, COOKIES_NAMES.REFRESH_TOKEN, "" );
    setCookies(res, COOKIES_NAMES.DEVICE_ID, "", true);

    res.redirect(`${config.client.uri}`);
  }
}
