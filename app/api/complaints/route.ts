import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Complaint } from "@/lib/models/complaint";
import { complaintSchema } from "@/lib/validators";
import { z } from "zod";

async function generateUniqueReferenceId(): Promise<string> {
  let isUnique = false;
  let referenceId = "";
  
  while (!isUnique) {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    referenceId = `GP${randomNum}`;
    const existing = await Complaint.findOne({ referenceId });
    if (!existing) {
      isUnique = true;
    }
  }
  
  return referenceId;
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = complaintSchema.parse(json);

    await connectToDatabase();
    
    const referenceId = await generateUniqueReferenceId();

    const newComplaint = await Complaint.create({
      ...data,
      referenceId,
    });

    return NextResponse.json({ success: true, referenceId: newComplaint.referenceId }, { status: 201 });
  } catch (error: any) {
    console.error("Complaint Creation Error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation Error", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create complaint", details: error.message }, { status: 500 });
  }
}
