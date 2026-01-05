import { Redis } from 'ioredis';
import { config } from '../../shared/config';

export class RedisService {
  private static instance: Redis;

  static getInstance(): Redis {
    if (!RedisService.instance) {
      RedisService.instance = new Redis({
        host: config.redis.host,
        port: Number(config.redis.port),
        username: config.redis.username,
        password: config.redis.password,
      });

      RedisService.instance.on('connect', () => {
        console.log('Connected to Redis');
      });

      RedisService.instance.on('error', (err) => {
        console.error('Redis error:', err);
      });
    }
    return RedisService.instance;
  }
}

export const redis = RedisService.getInstance();
