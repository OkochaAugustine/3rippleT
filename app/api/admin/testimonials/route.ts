import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Testimonial from "@/models/testimonial";
import { verifyToken } from "@/lib/auth/auth";

// GET /api/admin/testimonials - Fetch all testimonials
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
    const isApproved = searchParams.get("isApproved");
    const isFeatured = searchParams.get("isFeatured");

    const query: Record<string, unknown> = {};
    if (isPublished !== null) query.isPublished = isPublished === "true";
    if (isApproved !== null) query.isApproved = isApproved === "true";
    if (isFeatured !== null) query.isFeatured = isFeatured === "true";

    const testimonials = await Testimonial.find(query).sort({ displayOrder: 1, createdAt: -1 });

    return NextResponse.json({ testimonials });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

// POST /api/admin/testimonials - Create testimonial
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
    const { customerName, customerPosition, mediaId, rating, review } = body;

    if (!customerName || !rating || !review) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Get max display order
    const maxOrder = await Testimonial.findOne().sort({ displayOrder: -1 });
    const displayOrder = maxOrder ? maxOrder.displayOrder + 1 : 0;

    const testimonial = await Testimonial.create({
      customerName,
      customerPosition,
      mediaId,
      rating,
      review,
      displayOrder,
      createdBy: decoded.userId || decoded.id,
    });

    return NextResponse.json({ testimonial }, { status: 201 });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}
