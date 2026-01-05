import mongoose from 'mongoose';
import { config } from '../../../shared/config';

export class MongoConnect {
  private _mongourl: string;

  constructor() {
    this._mongourl = config.database.mongoDb;
  }

  public connect(): void {
    mongoose
      .connect(this._mongourl)
      .then(() => console.log('Connected to MongoDB'))
      .catch((err) => console.log(err));
  }
}
