import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/mongodb";
import { Booking } from "@/models/booking";
import { getSessionUser } from "@/lib/auth/auth";

export async function GET() {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const bookings = await Booking.find({ userId: session.id }).sort({ classDate: -1 });
    return NextResponse.json({ bookings });
  } catch (error: unknown) {
    console.error("GET bookings error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
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
    const { classId, className, classDate, classTime, instructor } = body;

    if (!classId || !className || !classDate || !classTime || !instructor) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check for duplicate booking
    const existingBooking = await Booking.findOne({
      userId: session.id,
      classId,
      classDate: new Date(classDate),
      status: { $in: ["confirmed", "completed"] },
    });

    if (existingBooking) {
      return NextResponse.json({ error: "You already have a booking for this class" }, { status: 400 });
    }

    const booking = await Booking.create({
      userId: session.id,
      userName: session.name,
      userEmail: session.email,
      classId,
      className,
      classDate: new Date(classDate),
      classTime,
      instructor,
      status: "confirmed",
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error: unknown) {
    console.error("POST booking error:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
