import { Redis } from "ioredis";
import { config } from "../../shared/config.js";

export class RedisService {
  static instance: Redis;

  connect() {
    if (!RedisService.instance) {
      RedisService.instance = new Redis({
        host: config.redis.host,
        port: Number(config.redis.port),
        username: config.redis.username,
        password: config.redis.password,
      });

      RedisService.instance.on("connect", () => {
        console.log("Connected to Redis");
      });

      RedisService.instance.on("error", (err) => {
        console.error("Redis error:", err);
      });
    }
  }
}

export const redis = RedisService.instance
