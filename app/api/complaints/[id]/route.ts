import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Complaint } from "@/lib/models/complaint";
import { cookies } from "next/headers";
import { verifyAuth } from "@/lib/auth";
import { z } from "zod";

const patchSchema = z.object({
  status: z.enum(["pending", "inProgress", "resolved", "rejected"]).optional(),
  assignedTo: z.string().optional(),
});

// GET does not require authentication - Public Tracker
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    // params.id is the referenceId
    const complaint = await Complaint.findOne({ referenceId: params.id.toUpperCase() }).lean();
    
    if (!complaint) {
      return NextResponse.json({ error: "Complaint not found" }, { status: 404 });
    }

    return NextResponse.json(complaint);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch complaint", details: error.message }, { status: 500 });
  }
}

// PATCH requires authentication
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!(await verifyAuth(token))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const json = await req.json();
    const body = patchSchema.parse(json);

    await connectToDatabase();
    
    const updatedUser = await Complaint.findOneAndUpdate(
      { referenceId: params.id },
      { $set: body },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    return NextResponse.json({ error: "Update failed", details: error.message }, { status: 500 });
  }
}

// DELETE requires authentication
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!(await verifyAuth(token))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectToDatabase();
    const deletedUser = await Complaint.findOneAndDelete({ referenceId: params.id });

    if (!deletedUser) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Delete failed", details: error.message }, { status: 500 });
  }
}
