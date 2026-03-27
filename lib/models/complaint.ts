import mongoose, { Schema, Document } from "mongoose";

export interface IComplaint extends Document {
  fullName: string;
  phoneNumber: string;
  complaintType: string;
  description: string;
  photo?: string;
  status: "pending" | "inProgress" | "resolved" | "rejected";
  referenceId: string;
  assignedTo?: string; 
  createdAt: Date;
  updatedAt: Date;
}

const ComplaintSchema = new Schema(
  {
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    complaintType: { type: String, required: true },
    description: { type: String, required: true },
    photo: { type: String }, // Base64
    status: {
      type: String,
      enum: ["pending", "inProgress", "resolved", "rejected"],
      default: "pending",
    },
    referenceId: { type: String, required: true, unique: true },
    assignedTo: { type: String, default: "Unassigned" }, 
  },
  {
    timestamps: true,
  }
);

export const Complaint = mongoose.models.Complaint || mongoose.model<IComplaint>("Complaint", ComplaintSchema);
