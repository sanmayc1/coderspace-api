"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordRestRepository = void 0;
const redis_1 = require("../../frameworks/cache/redis");
class PasswordRestRepository {
    async save(key, value, expire) {
        await redis_1.redis.set(key, value, 'EX', expire);
    }
    async find(key) {
        return await redis_1.redis.get(key);
    }
    async del(key) {
        await redis_1.redis.del(key);
    }
}
exports.PasswordRestRepository = PasswordRestRepository;
//# sourceMappingURL=password-reset.repository.js.map