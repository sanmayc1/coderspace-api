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
    pass: process.env.EMAIL_PASSWORD,
  },
  redis: {
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  github: {
    calllbackUrl: process.env.GITHUB_CALLBACK_URI,
    redirectUrl: process.env.GITHUB_REDIRECT_URI,
    secret: process.env.GITHUB_SECERT,
    clientId: process.env.GITHUB_CLIENT_ID,
    exchangeTokenUrl: process.env.GITHUB_EXCHANGE_TOKEN_URI,
    getUserUrl: process.env.GITHUB_GET_USER_URI,
  },
  google:{
    clientId:process.env.GOOGLE_CLIENT_ID,
    secret:process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl:process.env.GOOGLE_CALLBACK_URI
  },
  environment: process.env.NODE_ENV,
  cookieSecret: process.env.COOKIES_SECRET,
};
