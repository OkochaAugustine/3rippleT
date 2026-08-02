import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import EventRegistration from "@/models/eventRegistration";
import { verifyToken } from "@/lib/auth/auth";
import { EVENT_CONFIG } from "@/constants/event-config";

// GET /api/admin/delta-state-carnival/registrations - Fetch all registrations
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
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "-1";

    const query: Record<string, unknown> = { eventId: EVENT_CONFIG.EVENT_ID };

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { registrationCode: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    const [registrations, total] = await Promise.all([
      EventRegistration.find(query)
        .sort({ [sortBy]: sortOrder === "-1" ? -1 : 1 })
        .skip(skip)
        .limit(limit),
      EventRegistration.countDocuments(query),
    ]);

    return NextResponse.json({
      registrations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 });
  }
}
