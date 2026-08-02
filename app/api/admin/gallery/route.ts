import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Gallery from "@/models/gallery";
import { verifyToken } from "@/lib/auth/auth";

// GET /api/admin/gallery - Fetch all gallery items
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
    const category = searchParams.get("category");

    const query: Record<string, unknown> = {};
    if (isPublished !== null) query.isPublished = isPublished === "true";
    if (isFeatured !== null) query.isFeatured = isFeatured === "true";
    if (category) query.category = category;

    const gallery = await Gallery.find(query).sort({ displayOrder: 1, createdAt: -1 });

    return NextResponse.json({ gallery });
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}

// POST /api/admin/gallery - Create gallery item
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
    const { title, description, mediaId, category, tags } = body;

    if (!title || !mediaId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Get max display order
    const maxOrder = await Gallery.findOne().sort({ displayOrder: -1 });
    const displayOrder = maxOrder ? maxOrder.displayOrder + 1 : 0;

    const gallery = await Gallery.create({
      title,
      description,
      mediaId,
      category,
      tags,
      displayOrder,
      createdBy: decoded.userId || decoded.id,
    });

    return NextResponse.json({ gallery }, { status: 201 });
  } catch (error) {
    console.error("Error creating gallery item:", error);
    return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 });
  }
}
