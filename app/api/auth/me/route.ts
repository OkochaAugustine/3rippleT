import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/mongodb";
import { User } from "@/models/user";
import { getSessionUser } from "@/lib/auth/auth";

export async function GET() {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 },
      );
    }

    await dbConnect();
    const user = await User.findById(session.userId);
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        membership: user.membership,
        role: user.role,
        isVerified: user.isVerified,
        verificationStatus: user.verificationStatus,
        createdAt: user.createdAt,
      },
    });
  } catch (error: unknown) {
    console.error("GET me error:", error);
    return NextResponse.json(
      { error: "An error occurred retrieving session user" },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 },
      );
    }

    await dbConnect();
    const body = await req.json();
    const { name, phone } = body;

    const user = await User.findById(session.userId);
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 },
      );
    }

    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;

    await user.save();

    return NextResponse.json({
      message: "Profile updated successfully",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        membership: user.membership,
        role: user.role,
        isVerified: user.isVerified,
        verificationStatus: user.verificationStatus,
        createdAt: user.createdAt,
      },
    });
  } catch (error: unknown) {
    console.error("PUT me error:", error);
    return NextResponse.json(
      { error: "An error occurred updating profile" },
      { status: 500 },
    );
  }
}
