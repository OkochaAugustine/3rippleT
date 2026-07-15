import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/mongodb";
import { Attendance } from "@/models/attendance";
import { getSessionUser } from "@/lib/auth/auth";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();
    const { checkOutTime, notes } = body;

    const { id } = await params;
    const attendance = await Attendance.findOne({ _id: id, userId: session.id });
    if (!attendance) {
      return NextResponse.json({ error: "Attendance record not found" }, { status: 404 });
    }

    if (checkOutTime) {
      attendance.checkOutTime = new Date(checkOutTime);
      const duration = Math.floor((attendance.checkOutTime.getTime() - attendance.checkInTime.getTime()) / (1000 * 60));
      attendance.duration = duration;
    }
    if (notes !== undefined) attendance.notes = notes;

    await attendance.save();

    return NextResponse.json({ attendance });
  } catch (error: unknown) {
    console.error("PATCH attendance error:", error);
    return NextResponse.json({ error: "Failed to update attendance" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;
    const attendance = await Attendance.findOne({ _id: id, userId: session.id });
    if (!attendance) {
      return NextResponse.json({ error: "Attendance record not found" }, { status: 404 });
    }

    await Attendance.deleteOne({ _id: id });

    return NextResponse.json({ message: "Attendance record deleted" });
  } catch (error: unknown) {
    console.error("DELETE attendance error:", error);
    return NextResponse.json({ error: "Failed to delete attendance" }, { status: 500 });
  }
}
