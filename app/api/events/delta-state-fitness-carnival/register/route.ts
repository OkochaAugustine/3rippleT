import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import EventRegistration from "@/models/eventRegistration";
import { EVENT_CONFIG } from "@/constants/event-config";

// Generate unique registration code
function generateRegistrationCode(): string {
  const prefix = "DSFC";
  const year = new Date().getFullYear();
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomPart = "";
  for (let i = 0; i < 6; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${year}-${randomPart}`;
}

// POST /api/events/delta-state-fitness-carnival/register - Register for event
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    // Validate required fields
    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "dateOfBirth",
      "gender",
      "location",
      "fitnessExperience",
      "emergencyContactName",
      "emergencyContactPhone",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Check if registration is open
    if (!EVENT_CONFIG.REGISTRATION_OPEN) {
      return NextResponse.json(
        { error: "Registration is currently closed" },
        { status: 400 }
      );
    }

    // Check capacity
    if (EVENT_CONFIG.MAX_CAPACITY !== null) {
      const currentCount = await EventRegistration.countDocuments({
        eventId: EVENT_CONFIG.EVENT_ID,
        status: { $ne: "cancelled" },
      });

      if (currentCount >= EVENT_CONFIG.MAX_CAPACITY) {
        return NextResponse.json(
          { error: "Event registration is full" },
          { status: 400 }
        );
      }
    }

    // Check for duplicate registration by email
    const existingRegistration = await EventRegistration.findOne({
      eventId: EVENT_CONFIG.EVENT_ID,
      email: body.email.toLowerCase(),
      status: { $ne: "cancelled" },
    });

    if (existingRegistration) {
      return NextResponse.json(
        { error: "You have already registered for this event" },
        { status: 400 }
      );
    }

    // Generate unique registration code
    let registrationCode = generateRegistrationCode();
    let codeExists = await EventRegistration.findOne({ registrationCode });

    // Ensure code is unique
    while (codeExists) {
      registrationCode = generateRegistrationCode();
      codeExists = await EventRegistration.findOne({ registrationCode });
    }

    // Create registration
    const registration = await EventRegistration.create({
      registrationCode,
      eventId: EVENT_CONFIG.EVENT_ID,
      fullName: body.fullName.trim(),
      email: body.email.toLowerCase().trim(),
      phone: body.phone.trim(),
      dateOfBirth: new Date(body.dateOfBirth),
      gender: body.gender,
      location: body.location.trim(),
      fitnessExperience: body.fitnessExperience,
      emergencyContactName: body.emergencyContactName.trim(),
      emergencyContactPhone: body.emergencyContactPhone.trim(),
      status: "confirmed",
    });

    return NextResponse.json({
      success: true,
      registrationCode: registration.registrationCode,
      registration: {
        fullName: registration.fullName,
        email: registration.email,
        registrationCode: registration.registrationCode,
      },
    });
  } catch (error) {
    console.error("Error creating registration:", error);
    return NextResponse.json(
      { error: "Failed to create registration" },
      { status: 500 }
    );
  }
}

// GET /api/events/delta-state-fitness-carnival/stats - Get registration stats
export async function GET() {
  try {
    await connectDB();

    const totalCount = await EventRegistration.countDocuments({
      eventId: EVENT_CONFIG.EVENT_ID,
      status: { $ne: "cancelled" },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayCount = await EventRegistration.countDocuments({
      eventId: EVENT_CONFIG.EVENT_ID,
      status: { $ne: "cancelled" },
      createdAt: { $gte: today },
    });

    const pendingCount = await EventRegistration.countDocuments({
      eventId: EVENT_CONFIG.EVENT_ID,
      status: "pending",
    });

    const confirmedCount = await EventRegistration.countDocuments({
      eventId: EVENT_CONFIG.EVENT_ID,
      status: "confirmed",
    });

    const cancelledCount = await EventRegistration.countDocuments({
      eventId: EVENT_CONFIG.EVENT_ID,
      status: "cancelled",
    });

    return NextResponse.json({
      registrationCount: totalCount,
      todayCount,
      pendingCount,
      confirmedCount,
      cancelledCount,
      maxCapacity: EVENT_CONFIG.MAX_CAPACITY,
      registrationOpen: EVENT_CONFIG.REGISTRATION_OPEN,
    });
  } catch (error) {
    console.error("Error fetching registration stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch registration stats" },
      { status: 500 }
    );
  }
}
