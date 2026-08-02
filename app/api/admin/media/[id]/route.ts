import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Media from "@/models/media";
import { verifyToken } from "@/lib/auth/auth";
import { unlink } from "fs/promises";
import path from "path";

// PATCH /api/admin/media/[id] - Update media
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

    const { id } = await params;
    const body = await req.json();
    const media = await Media.findByIdAndUpdate(
      id,
      { ...body, updatedBy: decoded.userId || decoded.id },
      { new: true, runValidators: true }
    );

    if (!media) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    return NextResponse.json({ media });
  } catch (error) {
    console.error("Error updating media:", error);
    return NextResponse.json({ error: "Failed to update media" }, { status: 500 });
  }
}

// DELETE /api/admin/media/[id] - Delete media
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

    const { id } = await params;
    const media = await Media.findById(id);
    if (!media) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    // Delete file from filesystem
    const filepath = path.join(process.cwd(), "public", media.url);
    try {
      await unlink(filepath);
    } catch (err) {
      console.warn("Failed to delete file:", err);
    }

    await Media.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting media:", error);
    return NextResponse.json({ error: "Failed to delete media" }, { status: 500 });
  }
}
