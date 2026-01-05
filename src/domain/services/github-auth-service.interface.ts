import { IGitHubResponse } from '../entities/github-response.entity';

export interface IGitHubAuthService {
  exchangeToken(code: string): Promise<string | null>;
  getUserProfile(accessToken: string): Promise<IGitHubResponse>;
}
