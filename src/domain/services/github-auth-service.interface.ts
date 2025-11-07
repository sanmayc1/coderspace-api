import { IGitHubResponse } from "../entities/github-response.entity.js";


export interface IGitHubAuthService {
  exchangeToken(code: string): Promise<string |null>;
  getUserProfile(accessToken: string): Promise<IGitHubResponse>;
}
