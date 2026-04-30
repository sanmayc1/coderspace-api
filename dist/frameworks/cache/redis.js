"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = exports.RedisService = void 0;
const ioredis_1 = require("ioredis");
const config_1 = require("../../shared/config");
class RedisService {
    static instance;
    static getInstance() {
        if (!RedisService.instance) {
            RedisService.instance = new ioredis_1.Redis({
                host: config_1.config.redis.host,
                port: Number(config_1.config.redis.port),
                username: config_1.config.redis.username,
                password: config_1.config.redis.password,
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
exports.RedisService = RedisService;
exports.redis = RedisService.getInstance();
//# sourceMappingURL=redis.js.map