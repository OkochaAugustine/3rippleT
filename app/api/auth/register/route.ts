import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/db/mongodb";
import { User } from "@/models/user";
import { signToken, setAuthCookie } from "@/lib/auth/auth";
import { sendVerificationEmail } from "@/lib/email/nodemailer";
import { EmailLog } from "@/models/emailLog";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { name, email, password, phone, membership } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required fields" },
        { status: 400 },
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Duplicate email check
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email address already exists" },
        { status: 409 },
      );
    }

    // Password length validation
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 },
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationCodeExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Create user in DB
    // Default role is MEMBER
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      phone: phone || "",
      membership: membership || "none",
      role: "MEMBER",
      password: hashedPassword,
      isVerified: false,
      verificationStatus: "unverified",
      verificationCode,
      verificationCodeExpires,
    });

    // Send verification email & log status
    try {
      await sendVerificationEmail(user.email, verificationCode);
      await EmailLog.create({
        recipient: user.email,
        subject: "Verify your 3Ripple T Fitness account",
        type: "verification",
        status: "sent",
      });
    } catch (err: unknown) {
      console.error("Registration email delivery failed:", err);
      await EmailLog.create({
        recipient: user.email,
        subject: "Verify your 3Ripple T Fitness account",
        type: "verification",
        status: "failed",
        error: err instanceof Error ? err.message : String(err),
      });
    }

    // Sign JWT token
    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // Set cookie
    await setAuthCookie(token);

    // Return user details without password
    return NextResponse.json(
      {
        message: "Registration successful. Verification email sent.",
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
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "An error occurred during registration. Please try again." },
      { status: 500 },
    );
  }
}
