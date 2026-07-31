import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import nodemailer from "nodemailer";
import { prisma } from "./prisma";

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const auth = betterAuth({
  trustedOrigins: [process.env.APP_URL as string],
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      address: {
        type: "string",
        required: false,
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, token }, request) => {
      const verificationUrl = `${process.env.APP_URL}/verification-email?token=${token}`;

      try {
        const info = await transporter.sendMail({
          from: '"Prisma Blog App" <prismablog@example.com>',
          to: user.email,
          subject: "Verify Your Email Address",
          html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Verification</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,.08);">

          <tr>
            <td
              style="background:#2563eb;color:#ffffff;padding:30px;text-align:center;font-size:28px;font-weight:bold;">
              Prisma Blog App
            </td>
          </tr>

          <tr>
            <td style="padding:40px 35px;">

              <h2 style="margin-top:0;color:#222;">
                Hello, ${user.name}! 👋
              </h2>

              <p style="font-size:16px;color:#555;line-height:1.7;">
                Thank you for creating an account with
                <strong>Prisma Blog App</strong>.
              </p>

              <p style="font-size:16px;color:#555;line-height:1.7;">
                Please verify your email address by clicking the button below.
              </p>

              <div style="text-align:center;margin:40px 0;">
                <a href="${verificationUrl}"
                  style="
                    display:inline-block;
                    background:#2563eb;
                    color:#ffffff;
                    text-decoration:none;
                    padding:15px 35px;
                    border-radius:8px;
                    font-size:16px;
                    font-weight:bold;
                  ">
                  Verify Email
                </a>
              </div>

              <p style="font-size:15px;color:#666;line-height:1.7;">
                If the button doesn't work, copy and paste this URL into your browser:
              </p>

              <p style="word-break:break-all;">
                <a href="${verificationUrl}" style="color:#2563eb;">
                  ${verificationUrl}
                </a>
              </p>

              <hr style="border:none;border-top:1px solid #e5e5e5;margin:35px 0;" />

              <p style="font-size:14px;color:#888;line-height:1.6;">
                If you didn't create an account, you can safely ignore this email.
              </p>

            </td>
          </tr>

          <tr>
            <td
              style="background:#f8f8f8;padding:20px;text-align:center;font-size:13px;color:#777;">
              © ${new Date().getFullYear()} Prisma Blog App. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`,
        });

        console.log("Message sent:", info.messageId);
      } catch (err) {
        console.error("Error while sending mail:", err);
      }
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
