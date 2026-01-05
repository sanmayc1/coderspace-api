import { Schema } from 'mongoose';
import { LANGUAGES } from '../../../shared/constant';
import { ILanguageModel } from '../models/language.model';

export const langaugeSchema = new Schema<ILanguageModel>(
  {
    language: {
      type: String,
      enum: LANGUAGES,
    },
    solution: {
      type: String,
      default: '',
    },
    templateCode: {
      type: String,
      default: '',
    },
    functionName: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);
