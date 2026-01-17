import 'reflect-metadata';
import { Server } from './frameworks/express/server';
import { MongoConnect } from './frameworks/database/mongoDB/connect';
import './frameworks/di/di-resolver';
import { RedisService } from './frameworks/cache/redis';

(async () => {
  try {
    const app = new Server();
    const mongoDb = new MongoConnect();

    mongoDb.connect();
    RedisService.getInstance();
    app.start();
  } catch (error) {
    console.error('Failed to start application', error);
    process.exit(1);
  }
})();


