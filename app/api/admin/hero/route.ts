import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import HeroSlide from "@/models/heroSlide";
import { verifyToken } from "@/lib/auth/auth";

// GET /api/admin/hero - Fetch all hero slides
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

    const query: Record<string, unknown> = {};
    if (isPublished !== null) query.isPublished = isPublished === "true";

    const heroSlides = await HeroSlide.find(query).sort({ displayOrder: 1, createdAt: -1 });

    return NextResponse.json({ heroSlides });
  } catch (error) {
    console.error("Error fetching hero slides:", error);
    return NextResponse.json({ error: "Failed to fetch hero slides" }, { status: 500 });
  }
}

// POST /api/admin/hero - Create hero slide
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
    const { title, subtitle, mediaId, mediaType, videoUrl, posterUrl, primaryCtaText, primaryCtaLink, secondaryCtaText, secondaryCtaLink, overlayOpacity, autoplay } = body;

    if (!title || !mediaId || !mediaType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Get max display order
    const maxOrder = await HeroSlide.findOne().sort({ displayOrder: -1 });
    const displayOrder = maxOrder ? maxOrder.displayOrder + 1 : 0;

    const heroSlide = await HeroSlide.create({
      title,
      subtitle,
      mediaId,
      mediaType,
      videoUrl,
      posterUrl,
      primaryCtaText,
      primaryCtaLink,
      secondaryCtaText,
      secondaryCtaLink,
      overlayOpacity: overlayOpacity || 0.5,
      autoplay: autoplay !== undefined ? autoplay : true,
      displayOrder,
      createdBy: decoded.userId || decoded.id,
    });

    return NextResponse.json({ heroSlide }, { status: 201 });
  } catch (error) {
    console.error("Error creating hero slide:", error);
    return NextResponse.json({ error: "Failed to create hero slide" }, { status: 500 });
  }
}
