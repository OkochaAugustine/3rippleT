import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Gallery from "@/models/gallery";
import { verifyToken } from "@/lib/auth/auth";

// PATCH /api/admin/gallery/[id] - Update gallery item
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
    const gallery = await Gallery.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true }
    );

    if (!gallery) {
      return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
    }

    return NextResponse.json({ gallery });
  } catch (error) {
    console.error("Error updating gallery item:", error);
    return NextResponse.json({ error: "Failed to update gallery item" }, { status: 500 });
  }
}

// DELETE /api/admin/gallery/[id] - Delete gallery item
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
    await Gallery.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    return NextResponse.json({ error: "Failed to delete gallery item" }, { status: 500 });
  }
}
