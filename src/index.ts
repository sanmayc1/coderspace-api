import "reflect-metadata";
import { Server } from "./frameworks/express/server.js";
import { MongoConnect } from "./frameworks/database/mongoDB/connect.js";
import "./frameworks/di/di-resolver.js";

(async () => {
  try {
    const app = new Server();
    const mongoDb = new MongoConnect();

    mongoDb.connect();
    app.start();
  } catch (error) {
    console.error("Failed to start application", error);
    process.exit(1);
  }
})();
