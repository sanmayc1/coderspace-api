"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
require("winston-mongodb");
const config_1 = require("../../shared/config");
const productionTransport = [
    new winston_1.default.transports.MongoDB({
        db: config_1.config.database.mongoDb,
        collection: 'error_logs',
        level: 'error',
        expireAfterSeconds: 60 * 60 * 24 * 2,
    }),
];
const developmentTransport = [
    new winston_1.default.transports.Console({
        format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple()),
    }),
    new winston_1.default.transports.MongoDB({
        db: config_1.config.database.mongoDb,
        collection: 'error_logs',
        level: 'error',
        expireAfterSeconds: 60 * 60 * 24 * 2,
    }),
];
exports.logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.default.format.errors({ stack: true }), winston_1.default.format.splat(), winston_1.default.format.json()),
    defaultMeta: { service: 'coderspace' },
    transports: config_1.config.environment !== 'production' ? developmentTransport : productionTransport,
});
//# sourceMappingURL=winston.js.map