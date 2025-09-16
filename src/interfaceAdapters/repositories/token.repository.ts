import { injectable } from "tsyringe";
import { ITokenRepository } from "../../entities/repositoryInterfaces/token-repository.interface.js";
import { TokenModel } from "../../frameworks/database/models/token.model.js";

@injectable()
export class TokenRepository implements ITokenRepository {
  async deleteAllTokenByAccountId(accountId: string): Promise<void> {
    await TokenModel.deleteMany({ accountId });
  }
  async saveToken(
    accountId: string,
    deviceId: string,
    token: string,
    expiry: Date
  ): Promise<void> {
    await TokenModel.create({ accountId, deviceId, token, expiry });
    console.log('saved token')
  }
  async updateToken(token: string, deviceId: string): Promise<void> {
    await TokenModel.findOneAndUpdate({ deviceId }, { token });
    console.log('update token')
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
    console.log('delete token')
  }
}
