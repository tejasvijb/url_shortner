import type { UserRole } from "#/types/user.js";

import mongoose, { Schema } from "mongoose";

type BaseUserAttributes = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: UserRole;
};
type UserModelType = mongoose.Model<BaseUserAttributes>;

const userSchema = new Schema<BaseUserAttributes>(
  {
    email: {
      index: true,
      lowercase: true,
      required: true,
      trim: true,
      type: String,
      unique: true,
    },
    firstName: {
      maxlength: 64,
      minlength: 2,
      required: true,
      trim: true,
      type: String,
    },
    lastName: {
      maxlength: 64,
      minlength: 2,
      required: true,
      trim: true,
      type: String,
    },
    password: {
      minlength: 8,
      required: true,
      select: false,
      type: String,
    },
    role: {
      default: "user",
      enum: ["user", "admin"],
      type: String,
    },
  },
  {
    collection: "users",
    timestamps: true,
  },
);

userSchema.index({ email: 1 }, { collation: { locale: "en", strength: 2 }, unique: true });

const UserModel = (mongoose.models.User as UserModelType) ?? mongoose.model<BaseUserAttributes, UserModelType>("User", userSchema);

export default UserModel;
