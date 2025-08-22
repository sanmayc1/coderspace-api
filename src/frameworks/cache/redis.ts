import { Redis } from "ioredis";
import { config } from "../../shared/config.js";

export class RedisService {
  private static instance: Redis;

  // Get Redis instance (connect if not already)
  static getInstance(): Redis {
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
    return RedisService.instance;
  }
}

// Usage:
export const redis = RedisService.getInstance();