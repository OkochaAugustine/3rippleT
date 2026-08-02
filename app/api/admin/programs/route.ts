import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Program from "@/models/program";
import { verifyToken } from "@/lib/auth/auth";

// GET /api/admin/programs - Fetch all programs
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
    const isPublished = searchParams.get("isPublished");
    const difficulty = searchParams.get("difficulty");

    const query: Record<string, unknown> = {};
    if (isPublished !== null) query.isPublished = isPublished === "true";
    if (difficulty) query.difficulty = difficulty;

    const programs = await Program.find(query).sort({ displayOrder: 1, createdAt: -1 });

    return NextResponse.json({ programs });
  } catch (error) {
    console.error("Error fetching programs:", error);
    return NextResponse.json({ error: "Failed to fetch programs" }, { status: 500 });
  }
}

// POST /api/admin/programs - Create program
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
    const { title, description, thumbnailMediaId, galleryMediaIds, price, duration, difficulty, benefits, schedule, capacity } = body;

    if (!title || !thumbnailMediaId || price === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Get max display order
    const maxOrder = await Program.findOne().sort({ displayOrder: -1 });
    const displayOrder = maxOrder ? maxOrder.displayOrder + 1 : 0;

    const program = await Program.create({
      title,
      description,
      thumbnailMediaId,
      galleryMediaIds,
      price,
      duration,
      difficulty,
      benefits,
      schedule,
      capacity,
      displayOrder,
      createdBy: decoded.userId || decoded.id,
    });

    return NextResponse.json({ program }, { status: 201 });
  } catch (error) {
    console.error("Error creating program:", error);
    return NextResponse.json({ error: "Failed to create program" }, { status: 500 });
  }
}
