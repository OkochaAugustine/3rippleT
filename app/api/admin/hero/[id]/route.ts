import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import HeroSlide from "@/models/heroSlide";
import { verifyToken } from "@/lib/auth/auth";

// PATCH /api/admin/hero/[id] - Update hero slide
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
    const heroSlide = await HeroSlide.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true }
    );

    if (!heroSlide) {
      return NextResponse.json({ error: "Hero slide not found" }, { status: 404 });
    }

    return NextResponse.json({ heroSlide });
  } catch (error) {
    console.error("Error updating hero slide:", error);
    return NextResponse.json({ error: "Failed to update hero slide" }, { status: 500 });
  }
}

// DELETE /api/admin/hero/[id] - Delete hero slide
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
    await HeroSlide.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting hero slide:", error);
    return NextResponse.json({ error: "Failed to delete hero slide" }, { status: 500 });
  }
}
