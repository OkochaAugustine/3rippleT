import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Trainer from "@/models/trainer";
import { verifyToken } from "@/lib/auth/auth";

// GET /api/admin/trainers - Fetch all trainers
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
    const isFeatured = searchParams.get("isFeatured");

    const query: Record<string, unknown> = {};
    if (isPublished !== null) query.isPublished = isPublished === "true";
    if (isFeatured !== null) query.isFeatured = isFeatured === "true";

    const trainers = await Trainer.find(query).sort({ displayOrder: 1, createdAt: -1 });

    return NextResponse.json({ trainers });
  } catch (error) {
    console.error("Error fetching trainers:", error);
    return NextResponse.json({ error: "Failed to fetch trainers" }, { status: 500 });
  }
}

// POST /api/admin/trainers - Create trainer
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
    const { name, position, biography, experience, mediaId, instagram, facebook, linkedin, specialties } = body;

    if (!name || !position || !mediaId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Get max display order
    const maxOrder = await Trainer.findOne().sort({ displayOrder: -1 });
    const displayOrder = maxOrder ? maxOrder.displayOrder + 1 : 0;

    const trainer = await Trainer.create({
      name,
      position,
      biography,
      experience,
      mediaId,
      instagram,
      facebook,
      linkedin,
      specialties,
      displayOrder,
      createdBy: decoded.userId || decoded.id,
    });

    return NextResponse.json({ trainer }, { status: 201 });
  } catch (error) {
    console.error("Error creating trainer:", error);
    return NextResponse.json({ error: "Failed to create trainer" }, { status: 500 });
  }
}
