import winston from 'winston';
import 'winston-mongodb';
import { config } from '../../shared/config';

const productionTransport = [
  new winston.transports.MongoDB({
    db: config.database.mongoDb,
    collection: 'error_logs',
    level: 'error',
    expireAfterSeconds: 60 * 60 * 24 * 2,
  }),
];

const developmentTransport = [
  new winston.transports.Console({
    format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
  }),
  new winston.transports.MongoDB({
    db: config.database.mongoDb,
    collection: 'error_logs',
    level: 'error',
    expireAfterSeconds: 60 * 60 * 24 * 2,
  }),
];

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'coderspace' },
  transports: config.environment !== 'production' ? developmentTransport : productionTransport,
});
