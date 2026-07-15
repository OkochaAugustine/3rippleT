import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/mongodb";
import { Attendance } from "@/models/attendance";
import { getSessionUser } from "@/lib/auth/auth";

export async function GET() {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const attendance = await Attendance.find({ userId: session.id }).sort({ date: -1 });
    return NextResponse.json({ attendance });
  } catch (error: unknown) {
    console.error("GET attendance error:", error);
    return NextResponse.json({ error: "Failed to fetch attendance" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();
    const { classId, className, notes } = body;

    const checkInTime = new Date();
    const attendance = await Attendance.create({
      userId: session.id,
      userName: session.name,
      date: checkInTime,
      checkInTime,
      classId: classId || "",
      className: className || "",
      notes: notes || "",
    });

    return NextResponse.json({ attendance }, { status: 201 });
  } catch (error: unknown) {
    console.error("POST attendance error:", error);
    return NextResponse.json({ error: "Failed to check in" }, { status: 500 });
  }
}
