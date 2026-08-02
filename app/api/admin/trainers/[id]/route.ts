import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Trainer from "@/models/trainer";
import { verifyToken } from "@/lib/auth/auth";

// PATCH /api/admin/trainers/[id] - Update trainer
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
    const trainer = await Trainer.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true }
    );

    if (!trainer) {
      return NextResponse.json({ error: "Trainer not found" }, { status: 404 });
    }

    return NextResponse.json({ trainer });
  } catch (error) {
    console.error("Error updating trainer:", error);
    return NextResponse.json({ error: "Failed to update trainer" }, { status: 500 });
  }
}

// DELETE /api/admin/trainers/[id] - Delete trainer
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
    await Trainer.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting trainer:", error);
    return NextResponse.json({ error: "Failed to delete trainer" }, { status: 500 });
  }
}
