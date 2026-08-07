import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/auth";

async function seedAdmin() {
  // console.log("***Checking seed admin***")
  try {
    console.log("***Starting Admin Seeding***");
    const adminData = {
      name: "pk",
      email: "pk@gmail.com",
      role: UserRole.Admin,
      password: "pk2026zewrxctfvgybhjn",
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
          origin : process.env.APP_URL || "http://localhost:4000",
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

    console.log("***Admin user created successfully***");
  } catch (error) {
    console.error("Error seeding admin:", error);
  }
}

seedAdmin();
