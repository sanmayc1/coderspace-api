import { IPasswordRestRepository } from "../../entities/repositoryInterfaces/password-reset.interface.js";
import { redis } from "../../frameworks/cache/redis.js";

export class PasswordRestRepository implements IPasswordRestRepository {
  async save(key: string, value: string, expire: number): Promise<void> {
    await redis.set(key, value, "EX", expire);
  }
  async find(key: string): Promise<string | null> {
    return await redis.get(key);
  }
  async del(key: string): Promise<void> {
    await redis.del(key);
  }
}
