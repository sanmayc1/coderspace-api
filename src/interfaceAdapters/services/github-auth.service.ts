import axios from "axios";
import { IGitHubAuthService } from "../../domain/services/github-auth-service.interface.js";
import { config } from "../../shared/config.js";
import { injectable } from "tsyringe";
import { HTTP_STATUS } from "../../shared/constant.js";
import { IGitHubResponse } from "../../domain/entities/github-response.entity.js";

@injectable()
export class GitHubAuthService implements IGitHubAuthService {
  async exchangeToken(code: string): Promise<string | null> {
    const response = await axios.post(
      `${config.github.exchangeTokenUrl}?client_id=${config.github.clientId}&client_secret=${config.github.secret}&code=${code}&redirect_uri=${config.github.calllbackUrl}`
    );

    if (response.status !== HTTP_STATUS.OK) {
      return null;
    }

    const params = new URLSearchParams(response.data);

    return params.get("access_token");
  }
  async getUserProfile(accessToken: string): Promise<IGitHubResponse> {
    const response = await axios.get(`${config.github.getUserUrl}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const user = response.data as IGitHubResponse;

    if (!user.email) {
      const response = await axios.get(`${config.github.getUserUrl}/emails`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      for (const data of response.data) {
        if (data.verified && data.primary) {
          user.email = data.email;
        }
      }
    }

    return user;
  }
}
