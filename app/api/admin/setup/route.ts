import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Admin } from "@/lib/models/admin";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await connectToDatabase();
    
    const existingAdmin = await Admin.findOne({});
    if (existingAdmin) {
      return NextResponse.json({ error: "Admin already setup." }, { status: 400 });
    }

    const hash = await bcrypt.hash("admin123", 10);
    await Admin.create({
      email: "admin@gram.com",
      passwordHash: hash
    });

    return NextResponse.json({ success: true, message: "Admin created: admin@gram.com / admin123" });
  } catch (error: any) {
    console.error("Setup Error:", error);
    return NextResponse.json({ error: "Failed to setup admin", details: error.message || String(error) }, { status: 500 });
  }
}
