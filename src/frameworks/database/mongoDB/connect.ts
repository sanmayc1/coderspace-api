import mongoose from "mongoose";
import { config } from "../../../shared/config.js";

export class MongoConnect {
  private _mongourl:string

  constructor() {
    this._mongourl = config.database.mongoDb ;
  }

  public connect(): void {
    mongoose
      .connect(this._mongourl)
      .then(() => console.log("MongoDB connected"))
      .catch((err)=>console.log(err))
  }
}

