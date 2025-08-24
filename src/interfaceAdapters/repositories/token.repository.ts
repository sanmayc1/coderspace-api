import { injectable } from "tsyringe";
import { ITokenRepository } from "../../entities/repositoryInterfaces/token-repository.interface.js";
import { TokenModel } from "../../frameworks/database/models/token.model.js";

@injectable()
export class TokenRepository implements ITokenRepository {
  async deleteAllTokenByUserId(userId: string): Promise<void> {
    await TokenModel.deleteMany({ userId });
  }
  async saveToken(
    userId: string,
    deviceId: string,
    token: string,
    expiry: Date
  ): Promise<void> {
    await TokenModel.create({ userId, deviceId, token, expiry });
  }
  async updateToken(token: string, deviceId: string): Promise<void> {
    await TokenModel.findOneAndUpdate({ deviceId }, { token });
  }
  async tokenExists(token: string, deviceId: string): Promise<boolean> {
    const data = await TokenModel.findOne({ token, deviceId });
    return data ? true : false;
  }
  async deleteByTokenAndDeviceId(
    token: string,
    deviceId: string
  ): Promise<void> {
    await TokenModel.findOneAndDelete({ token, deviceId });
  }
}
