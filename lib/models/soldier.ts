import mongoose, { Schema, Document } from "mongoose";

export interface ISoldier extends Document {
  name: string;
  village: string;
  force: string;
  rank?: string;
  phone?: string;
  photo?: string;
  message?: string;
  isPublic: boolean;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

const SoldierSchema = new Schema(
  {
    name: { type: String, required: true },
    village: { type: String, required: true },
    force: { type: String, required: true },
    rank: { type: String, required: false },
    phone: { type: String, required: false },
    photo: { type: String, required: false },
    message: { type: String, required: false },
    isPublic: { type: Boolean, default: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Soldier =
  mongoose.models.Soldier || mongoose.model<ISoldier>("Soldier", SoldierSchema);
