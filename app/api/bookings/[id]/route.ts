import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/mongodb";
import { Booking } from "@/models/booking";
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
    const { status, attended } = body;

    const { id } = await params;
    const booking = await Booking.findOne({ _id: id, userId: session.id });
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (status) booking.status = status;
    if (typeof attended === "boolean") booking.attended = attended;

    await booking.save();

    return NextResponse.json({ booking });
  } catch (error: unknown) {
    console.error("PATCH booking error:", error);
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
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
    const booking = await Booking.findOne({ _id: id, userId: session.id });
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    booking.status = "cancelled";
    await booking.save();

    return NextResponse.json({ message: "Booking cancelled" });
  } catch (error: unknown) {
    console.error("DELETE booking error:", error);
    return NextResponse.json({ error: "Failed to cancel booking" }, { status: 500 });
  }
}
