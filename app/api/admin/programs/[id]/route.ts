import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Program from "@/models/program";
import { verifyToken } from "@/lib/auth/auth";

// PATCH /api/admin/programs/[id] - Update program
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
    const program = await Program.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true }
    );

    if (!program) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    return NextResponse.json({ program });
  } catch (error) {
    console.error("Error updating program:", error);
    return NextResponse.json({ error: "Failed to update program" }, { status: 500 });
  }
}

// DELETE /api/admin/programs/[id] - Delete program
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
    await Program.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting program:", error);
    return NextResponse.json({ error: "Failed to delete program" }, { status: 500 });
  }
}
