import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import EventRegistration from "@/models/eventRegistration";
import { verifyToken } from "@/lib/auth/auth";

// PATCH /api/admin/delta-state-carnival/registrations/[id] - Update registration status
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const registration = await EventRegistration.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true }
    );

    if (!registration) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    return NextResponse.json({ registration });
  } catch (error) {
    console.error("Error updating registration:", error);
    return NextResponse.json({ error: "Failed to update registration" }, { status: 500 });
  }
}

// DELETE /api/admin/delta-state-carnival/registrations/[id] - Delete registration
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
    await EventRegistration.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting registration:", error);
    return NextResponse.json({ error: "Failed to delete registration" }, { status: 500 });
  }
}
