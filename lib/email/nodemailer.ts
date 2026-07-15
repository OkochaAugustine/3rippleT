import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function getEmailLayout(title: string, contentHtml: string): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #0a0a0a;
            color: #f8fafc;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
          }
          .wrapper {
            width: 100%;
            background-color: #0a0a0a;
            padding: 40px 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #0f0f0f;
            border: 1px solid #1e293b;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
          }
          .header {
            background-color: #050505;
            padding: 30px;
            text-align: center;
            border-bottom: 1px solid #1e293b;
          }
          .logo-box {
            background-color: #0a0a0a;
            border: 1px solid #1e293b;
            padding: 12px 24px;
            border-radius: 8px;
            display: inline-block;
            font-weight: 900;
            font-size: 20px;
            letter-spacing: 1px;
          }
          .logo-text {
            color: #ffffff;
            text-decoration: none;
          }
          .logo-accent {
            color: #c4ff5c; /* Brand accent green in dark mode */
          }
          .content {
            padding: 40px 30px;
            line-height: 1.6;
            font-size: 16px;
            color: #e2e8f0;
          }
          .button-container {
            text-align: center;
            margin: 30px 0;
          }
          .button {
            display: inline-block;
            padding: 14px 28px;
            background-color: #f36b3f; /* Brand secondary orange/red in dark mode */
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            font-size: 16px;
            letter-spacing: 0.5px;
            transition: background-color 0.2s;
            box-shadow: 0 4px 12px rgba(243, 107, 63, 0.2);
          }
          .footer {
            background-color: #050505;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #1e293b;
            font-size: 12px;
            color: #64748b;
          }
          .footer a {
            color: #c4ff5c;
            text-decoration: none;
          }
          h1, h2, h3 {
            color: #ffffff;
            margin-top: 0;
          }
          hr {
            border: none;
            border-top: 1px solid #1e293b;
            margin: 30px 0;
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
            <div class="header">
              <div class="logo-box">
                <span class="logo-text"><span class="logo-accent">3Ripple T</span> Fitness</span>
              </div>
            </div>
            <div class="content">
              ${contentHtml}
            </div>
            <div class="footer">
              <p>&copy; 2026 3Ripple T Fitness. All rights reserved.</p>
              <p>Lagos, Nigeria | <a href="${appUrl}">Visit Website</a></p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function sendVerificationEmail(email: string, code: string): Promise<void> {
  // Always log the code to the console for easy verification and debugging.
  console.log(`[VERIFICATION CODE] Email: ${email} | Code: ${code}`);

  try {
    const html = getEmailLayout(
      "Verify your 3Ripple T Fitness account",
      `
      <h2>Verify Your Email</h2>
      <p>Welcome to 3Ripple T Fitness! Thank you for signing up.</p>
      <p>To complete your registration and activate your account, please enter the 6-digit verification code below on the verification page:</p>
      <div style="font-size: 32px; font-weight: 800; text-align: center; margin: 30px 0; letter-spacing: 8px; color: #c4ff5c; background-color: #0a0a0a; border: 1px solid #1e293b; padding: 20px; border-radius: 8px;">
        ${code}
      </div>
      <p>This verification code is valid for <strong>15 minutes</strong>.</p>
      <p>If you did not create a 3Ripple T Fitness account, you can safely ignore this email.</p>
      `
    );

    const mailOptions = {
      from: `"3Ripple T Fitness" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify your 3Ripple T Fitness account",
      text: `Your verification code is: ${code}. It is valid for 15 minutes.`,
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Nodemailer failed to send email:", error);
    throw error;
  }
}

export async function sendWelcomeEmail(email: string, name: string, membership: string): Promise<void> {
  try {
    const membershipFormatted = membership.charAt(0).toUpperCase() + membership.slice(1);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const html = getEmailLayout(
      "Welcome to 3Ripple T Fitness!",
      `
      <h2>Welcome to the Team, ${name}!</h2>
      <p>Your 3Ripple T Fitness account has been successfully verified.</p>
      <p>We're thrilled to have you join our community. Your official membership status is active!</p>
      <div style="background-color: #0a0a0a; border: 1px solid #1e293b; padding: 20px; border-radius: 8px; margin: 25px 0;">
        <p style="margin: 0 0 10px 0;"><strong>Membership Plan:</strong> <span style="color: #c4ff5c;">${membershipFormatted}</span></p>
        <p style="margin: 0;"><strong>Account Status:</strong> <span style="color: #4ade80;">Verified</span></p>
      </div>
      <p>You can now log in to access your dashboard, book your class sessions, track your fitness progress, and check our schedules.</p>
      <div class="button-container">
        <a href="${appUrl}/dashboard" class="button">Go to Dashboard</a>
      </div>
      <p>Let's build a stronger, healthier version of you!</p>
      `
    );

    const mailOptions = {
      from: `"3Ripple T Fitness" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to 3Ripple T Fitness!",
      text: `Welcome ${name}! Your account has been verified. You are now a ${membershipFormatted} member.`,
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Nodemailer failed to send welcome email:", error);
    throw error;
  }
}

export async function sendResetPasswordEmail(email: string, name: string, token: string): Promise<void> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const resetUrl = `${appUrl}/reset-password?token=${token}`;

  try {
    const html = getEmailLayout(
      "Reset your 3Ripple T Fitness password",
      `
      <h2>Reset Your Password</h2>
      <p>Hi ${name},</p>
      <p>We received a request to reset the password for your 3Ripple T Fitness account.</p>
      <p>Click the button below to choose a new password. This link is valid for <strong>1 hour</strong>.</p>
      <div class="button-container">
        <a href="${resetUrl}" class="button">Reset Password</a>
      </div>
      <p>If you did not request a password reset, you can safely ignore this email and your password will remain unchanged.</p>
      <hr>
      <p style="font-size: 12px; color: #64748b; word-break: break-all;">If the button above does not work, copy and paste this URL into your browser:<br>${resetUrl}</p>
      `
    );

    const mailOptions = {
      from: `"3Ripple T Fitness" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset your 3Ripple T Fitness password",
      text: `Hi ${name}, click the link to reset your password: ${resetUrl}. This link expires in 1 hour.`,
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Nodemailer failed to send reset password email:", error);
    throw error;
  }
}

export async function sendBroadcastEmail(
  email: string,
  name: string,
  subject: string,
  message: string,
  buttonText?: string,
  buttonUrl?: string
): Promise<void> {
  try {
    const buttonHtml = buttonText && buttonUrl
      ? `
        <div class="button-container">
          <a href="${buttonUrl}" class="button">${buttonText}</a>
        </div>
      `
      : "";

    const html = getEmailLayout(
      subject,
      `
      <h2>Hello ${name},</h2>
      <div style="white-space: pre-wrap; font-size: 16px; color: #e2e8f0; margin-bottom: 20px;">${message}</div>
      ${buttonHtml}
      `
    );

    const mailOptions = {
      from: `"3Ripple T Fitness" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      text: `Hello ${name},\n\n${message}${buttonText && buttonUrl ? `\n\n${buttonText}: ${buttonUrl}` : ""}`,
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`Nodemailer failed to send broadcast email to ${email}:`, error);
    throw error;
  }
}
