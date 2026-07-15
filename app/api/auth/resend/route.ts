import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db/mongodb";
import { User } from "@/models/user";
import { sendVerificationEmail } from "@/lib/email/nodemailer";
import { EmailLog } from "@/models/emailLog";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 },
      );
    }

    if (user.isVerified) {
      return NextResponse.json(
        { error: "Account is already verified" },
        { status: 400 },
      );
    }

    // Rate limiting: Check if a code was sent in the last 60 seconds
    if (user.verificationCodeExpires) {
      // Subtract the 15 minute lifespan to get when it was generated
      const codeGeneratedAt = new Date(user.verificationCodeExpires.getTime() - 15 * 60 * 1000);
      const timeElapsed = Date.now() - codeGeneratedAt.getTime();
      const cooldownPeriod = 60 * 1000; // 60 seconds

      if (timeElapsed < cooldownPeriod) {
        const timeLeft = Math.ceil((cooldownPeriod - timeElapsed) / 1000);
        return NextResponse.json(
          { error: `Please wait ${timeLeft} seconds before requesting a new code` },
          { status: 429 },
        );
      }
    }

    // Generate new verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationCodeExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    user.verificationCode = verificationCode;
    user.verificationCodeExpires = verificationCodeExpires;
    await user.save();

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
      console.error("Resend verification email failed:", err);
      await EmailLog.create({
        recipient: user.email,
        subject: "Verify your 3Ripple T Fitness account",
        type: "verification",
        status: "failed",
        error: err instanceof Error ? err.message : String(err),
      });
    }

    return NextResponse.json({
      message: "Verification code sent successfully",
      expiresAt: verificationCodeExpires,
    });
  } catch (error: unknown) {
    console.error("Resend verification error:", error);
    return NextResponse.json(
      { error: "An error occurred resending verification code" },
      { status: 500 },
    );
  }
}
