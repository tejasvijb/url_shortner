import mongoose, { Document, Schema } from "mongoose";

export interface IShortUrl extends Document {
  clickCount: number;
  createdAt: Date;
  customAlias?: string;
  description?: string;
  expiresAt?: Date;
  isActive: boolean;
  lastClickedAt?: Date;
  originalUrl: string;
  shortCode: string;
  tags?: string[];
  updatedAt: Date;
  userId: mongoose.Types.ObjectId;
}

const shortUrlSchema = new Schema<IShortUrl>(
  {
    clickCount: {
      default: 0,
      min: 0,
      type: Number,
    },
    customAlias: {
      lowercase: true,
      match: /^[a-z0-9_-]{3,30}$/,
      sparse: true,
      trim: true,
      type: String,
      unique: true,
    },
    description: {
      maxlength: 500,
      trim: true,
      type: String,
    },
    expiresAt: {
      index: true,
      type: Date,
    },
    isActive: {
      default: true,
      index: true,
      type: Boolean,
    },
    lastClickedAt: {
      type: Date,
    },
    originalUrl: {
      required: true,
      trim: true,
      type: String,
    },
    shortCode: {
      index: true,
      required: true,
      trim: true,
      type: String,
      unique: true,
    },
    tags: {
      default: [],
      type: [String],
    },
    userId: {
      index: true,
      ref: "User",
      required: true,
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  },
);

// Index for finding active URLs
shortUrlSchema.index({ expiresAt: 1, isActive: 1 });

// Index for quick lookup by custom alias or short code
shortUrlSchema.index({ customAlias: 1, isActive: 1 });
shortUrlSchema.index({ isActive: 1, shortCode: 1 });

const ShortUrl = mongoose.model<IShortUrl>("ShortUrl", shortUrlSchema);

export default ShortUrl;
