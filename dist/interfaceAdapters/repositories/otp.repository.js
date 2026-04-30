"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpRepository = void 0;
const redis_1 = require("../../frameworks/cache/redis");
class OtpRepository {
    async delete(email) {
        await redis_1.redis.del(`email:${email}`);
    }
    async save(data) {
        await redis_1.redis.set(`email:${data.email}`, data.otp, 'EX', data.expiry);
    }
    async findByEmail(email) {
        return await redis_1.redis.get(`email:${email}`);
    }
}
exports.OtpRepository = OtpRepository;
//# sourceMappingURL=otp.repository.js.map