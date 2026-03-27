import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Soldier } from "@/lib/models/soldier";
import { soldierSchema } from "@/lib/validators";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const body = soldierSchema.parse(json);

    await connectToDatabase();

    const soldier = await Soldier.create({
      name: body.name,
      village: body.village,
      force: body.force,
      rank: body.rank,
      phone: body.phone,
      photo: body.photo,
      message: body.message,
      isPublic: body.isPublic,
      status: "pending", // Initially pending for admin approval
    });

    return NextResponse.json(soldier, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    console.error("Soldier POST error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
