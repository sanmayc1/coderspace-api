import { Schema } from 'mongoose';
import { IUserModel } from '../models/user.model';
import { BADGE, DIFFICULTY } from '../../../shared/constant';
import { ISubscription } from '../../../domain/entities/user.entity';


const subscriptionSchema = new Schema<ISubscription>({
  planId: {
    type: String,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
});

export const userSchema = new Schema<IUserModel>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    xpCoin: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 0,
    },
    globalScore: {
      type: Number,
      default: 0,
    },
    notification: {
      type: Boolean,
      default: true,
    },
    badge: {
      type: String,
      enum: BADGE,
      default: 'silver',
    },
    about: {
      type: String,
    },
    subscription: {
      type:subscriptionSchema,
      default: null,
    },
    isProfileComplete: {
      type: Boolean,
      default: false,
    },
    domain: {
      type: Array,
    },
    skills: {
      type: Array,
    },
    accountId: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
    },
    suggestionLevel: {
      type: String,
      enum: DIFFICULTY,
    },
  },
  { timestamps: true }
);
