import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Content from "@/models/content";
import { verifyToken } from "@/lib/auth/auth";

// GET /api/admin/content - Fetch all content
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const token = req.cookies.get("auth_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const section = searchParams.get("section");
    const search = searchParams.get("search");

    const query: Record<string, unknown> = {};
    if (section) query.section = section;
    if (search) {
      query.$or = [
        { key: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const content = await Content.find(query).sort({ section: 1, key: 1 });

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Error fetching content:", error);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

// POST /api/admin/content - Create or update content
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const token = req.cookies.get("auth_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { key, section, value, type, description } = body;

    if (!key || !section || !value) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const content = await Content.findOneAndUpdate(
      { key },
      {
        key,
        section,
        value,
        type: type || "text",
        description,
        updatedBy: decoded.userId || decoded.id,
      },
      { upsert: true, new: true, runValidators: true }
    );

    return NextResponse.json({ content }, { status: 201 });
  } catch (error) {
    console.error("Error saving content:", error);
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
  }
}
