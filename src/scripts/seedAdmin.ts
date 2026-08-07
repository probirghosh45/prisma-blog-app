import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/auth";

async function seedAdmin() {
  // console.log("***Checking seed admin***")
  try {
    console.log("***Starting Admin Seeding***");
    const adminData = {
      name: "pk",
      email: "pk26@gmail.com",
      role: UserRole.Admin,
      password: "pk2026zewrxctfvgybhjn",
      //   emailVerified: true, not working because email verification is handled by the auth system, not directly in the database
    };

    console.log("*** Checking Admin exist or not***");
    const existingUser = await prisma.user.findUnique({
      where: { email: adminData.email },
    });

    if (existingUser) {
      console.log("Admin user already exists.");
      return;
    }
    console.log("***Creating admin user...***");

    const signUpAdmin = await fetch(
      "http://localhost:5000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          origin: process.env.APP_URL || "http://localhost:4000",
        },
        body: JSON.stringify(adminData),
      },
    );
    if (!signUpAdmin.ok) {
      console.log("Failed to create admin");
      console.log(await signUpAdmin.status);
      console.log(await signUpAdmin.text());
      return;
    }

    if (signUpAdmin.ok) {
      console.log("***Admin user created successfully***");
      await prisma.user.update({
        where: { email: adminData.email },
        data: { emailVerified: true },
      });
    }
  } catch (error) {
    console.error("Error seeding admin:", error);
  }
}

seedAdmin();
