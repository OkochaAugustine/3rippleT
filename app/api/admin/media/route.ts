import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Media from "@/models/media";
import { verifyToken } from "@/lib/auth/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

// GET /api/admin/media - Fetch all media with filtering and pagination
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
    const category = searchParams.get("category");
    const isPublished = searchParams.get("isPublished");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "-1";

    const query: Record<string, unknown> = {};
    if (category) query.category = category;
    if (isPublished !== null) query.isPublished = isPublished === "true";
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { altText: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const [media, total] = await Promise.all([
      Media.find(query).sort({ [sortBy]: sortOrder === "-1" ? -1 : 1 }).skip(skip).limit(limit),
      Media.countDocuments(query),
    ]);

    return NextResponse.json({
      media,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching media:", error);
    return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 });
  }
}

// POST /api/admin/media - Upload new media
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

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const altText = formData.get("altText") as string;
    const tags = formData.get("tags") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!title || !category || !altText) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;
    const filepath = path.join(uploadDir, filename);

    // Write file
    await writeFile(filepath, buffer);

    // Get file info
    const fileSize = file.size;
    const mimeType = file.type;

    // Create media record
    const media = await Media.create({
      title,
      category: category as "hero" | "gallery" | "program" | "class" | "trainer" | "event" | "testimonial" | "about" | "marketing" | "other",
      description: description || "",
      altText,
      url: `/uploads/${filename}`,
      fileSize,
      mimeType,
      uploadedBy: decoded.userId || decoded.id,
      tags: tags ? tags.split(",").map((t) => t.trim()) : [],
    });

    return NextResponse.json({ media }, { status: 201 });
  } catch (error) {
    console.error("Error uploading media:", error);
    return NextResponse.json({ error: "Failed to upload media" }, { status: 500 });
  }
}
