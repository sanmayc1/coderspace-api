import { Schema } from "mongoose";
import { INotificationModel } from "../models/notification.model";

export const notificationSchema = new Schema<INotificationModel>({
  accountId: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true
  },
  message: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  type: {
    type: String
  },
  link: {
    type: String
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });
