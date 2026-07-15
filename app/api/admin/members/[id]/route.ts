import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/mongodb";
import { User } from "@/models/user";
import { getSessionUser } from "@/lib/auth/auth";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSessionUser();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    await dbConnect();
    const body = await req.json();
    const { name, email, phone, status, plan } = body;

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update details
    if (name) user.name = name;
    if (email) user.email = email.toLowerCase();
    if (phone !== undefined) user.phone = phone;
    if (plan) user.membership = plan;

    if (status) {
      if (status === "pending") {
        user.isVerified = false;
        user.verificationStatus = "unverified";
      } else {
        user.isVerified = true;
        user.verificationStatus = "verified";
      }
    }

    await user.save();

    return NextResponse.json({
      message: "Member updated successfully",
      member: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        status: status || (user.isVerified ? (user.membership === "none" ? "inactive" : "active") : "pending"),
        plan: user.membership,
        joinedDate: new Date(user.createdAt).toISOString().split("T")[0],
        attendanceCount: 0,
        profileComplete: user.phone ? 100 : 75,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error: unknown) {
    console.error("PUT member error:", error);
    return NextResponse.json(
      { error: "An error occurred updating member" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSessionUser();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    await dbConnect();

    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Member deleted successfully" });
  } catch (error: unknown) {
    console.error("DELETE member error:", error);
    return NextResponse.json(
      { error: "An error occurred deleting member" },
      { status: 500 },
    );
  }
}
