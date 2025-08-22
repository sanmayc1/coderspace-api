import { model, ObjectId } from "mongoose";
import { IRefreshTokenEntity } from "../../../entities/models/refresh-token.entity.js";
import { tokenSchema } from "../schema/token.schema.js";

export interface ITokenModel
  extends Omit<IRefreshTokenEntity, "_id" | "userId"> {
  _id: ObjectId;
  userId: ObjectId;
}

export const TokenModel = model("Token",tokenSchema)
