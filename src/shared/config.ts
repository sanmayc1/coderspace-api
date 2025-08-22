import dotenv from "dotenv";
dotenv.config();

export const config = {
  client: {
    uri: process.env.CLIENT_URL,
  },
  server: {
    port: process.env.PORT,
    host: process.env.HOST,
  },
  database: {
    mongoDb: process.env.MONGO_URL || "mongodb://localhost:27017/coderspace",
  },
  jwt: {
    accessSecret: process.env.ACCESS_SECRET,
    refreshSecret: process.env.REFRESH_SECRET,
    accessExpire: process.env.ACCESS_EXPIREIN,
    refreshExpire: process.env.REFRESH_EXPIREIN,
  },
  smtp: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  redis: {
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  environment: process.env.NODE_ENV,
  cookieSecret: process.env.COOKIES_SECRET,
};
