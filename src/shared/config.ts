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
    accessExpire:process.env.ACCESS_EXPIREIN,
    refreshExpire:process.env.REFRESH_EXPIREIN
  },
  environment: process.env.NODE_ENV,
};
