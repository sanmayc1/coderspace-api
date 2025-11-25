import { ILanguageEntity } from "../../../domain/entities/langauge-entity.js";
import {Document, model, ObjectId} from 'mongoose'
import { langaugeSchema } from "../schema/language.schema.js";


export interface ILanguageModel extends Omit<ILanguageEntity ,'_id'> ,Document{
  _id:ObjectId
}

export const LanguageModel = model("Language",langaugeSchema)