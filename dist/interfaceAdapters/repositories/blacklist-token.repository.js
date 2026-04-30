"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlackListRepository = void 0;
const tsyringe_1 = require("tsyringe");
const redis_1 = require("../../frameworks/cache/redis");
let BlackListRepository = class BlackListRepository {
    async save(token, expire) {
        await redis_1.redis.set(token, 'true', 'EX', expire);
    }
    async find(token) {
        return await redis_1.redis.get(token);
    }
};
exports.BlackListRepository = BlackListRepository;
exports.BlackListRepository = BlackListRepository = __decorate([
    (0, tsyringe_1.injectable)()
], BlackListRepository);
//# sourceMappingURL=blacklist-token.repository.js.map