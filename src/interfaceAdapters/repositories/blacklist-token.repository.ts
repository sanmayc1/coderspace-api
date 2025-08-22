import { injectable } from "tsyringe";
import { IBlackListTokenRepository } from "../../entities/repositoryInterfaces/blacklist-token.interface.js";
import { redis } from "../../frameworks/cache/redis.js";


@injectable()
export class BlackListRepository implements IBlackListTokenRepository {
  async save(token: string, expire: number): Promise<void> {
    await redis.set(token, "true", "EX", expire);
  }
  async find(token: string): Promise<string | null> {
    return await redis.get(token);
  }
}
