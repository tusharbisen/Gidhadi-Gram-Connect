import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Soldier } from "@/lib/models/soldier";
import { z } from "zod";

const soldierSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  village: z.string().min(2, "Village must be at least 2 characters"),
  force: z.string().min(2, "Force/Regiment is required"),
  rank: z.string().optional(),
  phone: z.string().optional(),
  photo: z.string().optional().or(z.literal("")),
  message: z.string().optional(),
  isPublic: z.boolean().default(true),
});

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
