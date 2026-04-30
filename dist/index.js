"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const server_1 = require("./frameworks/express/server");
const connect_1 = require("./frameworks/database/mongoDB/connect");
require("./frameworks/di/di-resolver");
const redis_1 = require("./frameworks/cache/redis");
(async () => {
    try {
        const app = new server_1.Server();
        const mongoDb = new connect_1.MongoConnect();
        mongoDb.connect();
        redis_1.RedisService.getInstance();
        app.start();
    }
    catch (error) {
        console.error('Failed to start application', error);
        process.exit(1);
    }
})();
//# sourceMappingURL=index.js.map