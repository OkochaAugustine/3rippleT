import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/db/mongodb";
import { User } from "@/models/user";
import { getSessionUser } from "@/lib/auth/auth";

export async function GET() {
  try {
    const session = await getSessionUser();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await dbConnect();
    const users = await User.find({}).sort({ createdAt: -1 });

    const members = users.map((u) => {
      // Calculate member status
      let status = "active";
      if (!u.isVerified) {
        status = "pending";
      } else if (u.membership === "none") {
        status = "inactive";
      }

      return {
        id: u._id.toString(),
        name: u.name,
        email: u.email,
        phone: u.phone || "",
        status,
        plan: u.membership || "none",
        joinedDate: u.createdAt ? new Date(u.createdAt).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
        attendanceCount: 0,
        profileComplete: u.phone ? 100 : 75,
        role: u.role,
        isVerified: u.isVerified,
      };
    });

    return NextResponse.json({ members });
  } catch (error: unknown) {
    console.error("GET members error:", error);
    return NextResponse.json(
      { error: "An error occurred fetching members" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSessionUser();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await dbConnect();
    const body = await req.json();
    const { name, email, phone, status, plan } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 },
      );
    }

    // Check if email already exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 },
      );
    }

    // Default password for admin-created accounts
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("3RippleTFit123!", salt);

    const isVerified = status !== "pending";
    const verificationStatus = isVerified ? "verified" : "unverified";

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      phone: phone || "",
      membership: plan || "none",
      role: "MEMBER",
      password: hashedPassword,
      isVerified,
      verificationStatus,
      verificationCode: "",
    });

    return NextResponse.json({
      message: "Member added successfully",
      member: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        status: status || "active",
        plan: user.membership,
        joinedDate: new Date(user.createdAt).toISOString().split("T")[0],
        attendanceCount: 0,
        profileComplete: user.phone ? 100 : 75,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error: unknown) {
    console.error("POST member error:", error);
    return NextResponse.json(
      { error: "An error occurred adding member" },
      { status: 500 },
    );
  }
}
