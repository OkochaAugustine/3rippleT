import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/db/mongodb";
import { User } from "@/models/user";
import { signToken, setAuthCookie } from "@/lib/auth/auth";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    // Sign token
    const token = signToken({
      userId: user._id.toString(),
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    });

    // Set cookie
    await setAuthCookie(token);

    return NextResponse.json({
      message: "Login successful",
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
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login. Please try again." },
      { status: 500 },
    );
  }
}
