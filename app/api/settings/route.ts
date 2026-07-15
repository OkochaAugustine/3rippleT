import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/mongodb";
import { Settings } from "@/models/settings";
import { getSessionUser } from "@/lib/auth/auth";

export async function GET() {
  try {
    await dbConnect();
    let settings = await Settings.findOne({});
    
    if (!settings) {
      settings = await Settings.create({});
    }

    return NextResponse.json({ settings });
  } catch (error: unknown) {
    console.error("GET settings error:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getSessionUser();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await dbConnect();
    const body = await req.json();

    let settings = await Settings.findOne({});
    if (!settings) {
      settings = await Settings.create({});
    }

    Object.assign(settings, body);
    await settings.save();

    return NextResponse.json({ settings });
  } catch (error: unknown) {
    console.error("PATCH settings error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
