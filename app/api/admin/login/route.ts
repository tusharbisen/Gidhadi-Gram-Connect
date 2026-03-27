import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Admin } from "@/lib/models/admin";
import bcrypt from "bcryptjs";
import { signToken, setAuthCookie } from "@/lib/auth";
import { loginSchema } from "@/lib/validators";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { email, password } = loginSchema.parse(json);

    await connectToDatabase();

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, admin.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await signToken({ email: admin.email, id: admin._id });
    await setAuthCookie(token);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation Error", details: error.errors }, { status: 400 });
    }
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
