import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Event from "@/models/event";
import { verifyToken } from "@/lib/auth/auth";

// GET /api/admin/events - Fetch all events
export async function GET(req: NextRequest) {
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

    const { searchParams } = new URL(req.url);
    const isPublished = searchParams.get("isPublished");
    const isArchived = searchParams.get("isArchived");

    const query: Record<string, unknown> = {};
    if (isPublished !== null) query.isPublished = isPublished === "true";
    if (isArchived !== null) query.isArchived = isArchived === "true";

    const events = await Event.find(query).sort({ startDate: -1, createdAt: -1 });

    return NextResponse.json({ events });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

// POST /api/admin/events - Create event
export async function POST(req: NextRequest) {
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

    const body = await req.json();
    const { title, description, bannerMediaId, location, startDate, endDate, registrationDeadline, price, capacity } = body;

    if (!title || !bannerMediaId || !startDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const event = await Event.create({
      title,
      description,
      bannerMediaId,
      location,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : undefined,
      registrationDeadline: registrationDeadline ? new Date(registrationDeadline) : undefined,
      price,
      capacity,
      createdBy: decoded.userId || decoded.id,
    });

    return NextResponse.json({ event }, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
