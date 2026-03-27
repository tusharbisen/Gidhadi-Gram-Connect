import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  email: string;
  passwordHash: string;
}

const AdminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Admin =
  mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);
