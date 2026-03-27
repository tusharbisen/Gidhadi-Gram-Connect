import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Soldier } from "@/lib/models/soldier";
import { z } from "zod";
import { cookies } from "next/headers";
import { verifyAuth } from "@/lib/auth";

const patchSchema = z.object({
  status: z.enum(["pending", "approved", "rejected"]),
});

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const auth = await verifyAuth(token);
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json = await req.json();
    const body = patchSchema.parse(json);

    await connectToDatabase();

    const updatedSoldier = await Soldier.findByIdAndUpdate(
      params.id,
      { status: body.status },
      { new: true }
    );

    if (!updatedSoldier) {
      return NextResponse.json({ error: "Soldier not found" }, { status: 404 });
    }

    return NextResponse.json(updatedSoldier);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    console.error("Soldier PATCH error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const auth = await verifyAuth(token);
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    
    const deletedSoldier = await Soldier.findByIdAndDelete(params.id);

    if (!deletedSoldier) {
      return NextResponse.json({ error: "Soldier not found" }, { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    console.error("Soldier DELETE error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
