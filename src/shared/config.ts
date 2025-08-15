import dotenv from "dotenv";
dotenv.config()


export const config  ={
  client:{
    uri:process.env.CLIENT_URL
  },
  server:{
    port:process.env.PORT,
    host:process.env.HOST
  },
  database:{
    mongoDb:process.env.MONGO_URL || "mongodb://localhost:27017/coderspace"
  }
}


