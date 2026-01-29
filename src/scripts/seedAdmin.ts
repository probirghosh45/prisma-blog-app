import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/auth";

async function seedAdmin() {
  const email = "pkadmin99@gmail.com";
  const password = "pk2026";

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    console.log("Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = randomUUID();

  await prisma.user.create({
    data: {
      id: userId,
      name: "admin",
      email,
      role: UserRole.ADMIN,
      emailVerified: true,
      accounts: {
        create: {
          id: randomUUID(),
          providerId: "email",   
          accountId: email,
          password: hashedPassword,
        },
      },
    },
  });

  console.log("admin created successfully");
}

seedAdmin()
  .then(() => process.exit(0))
  .catch(console.error);

























// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// /* eslint-disable @typescript-eslint/no-unsafe-call */
// import { prisma } from "../lib/prisma";
// import { UserRole } from "../middlewares/auth";

// async function seedAdmin() {
//     try {
//         // console.log("***** Admin Seeding Started....")
//         const adminData = {
//             name: "Admin2 Saheb",
//             email: "admin24@admin.com",
//             role: UserRole.ADMIN,
//             password: "admin1234"
//         }
//         // console.log("***** Checking Admin Exist or not")
//         // check user exist on db or not
//         const existingUser = await prisma.user.findUnique({
//             where: {
//                 email: adminData.email
//             }
//         });

//         if (existingUser) {
//             throw new Error("User already exists!!");
//         }

//         const signUpAdmin = await fetch("http://localhost:5000/api/auth/sign-up/email", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(adminData)
//         })

//         console.log(signUpAdmin)

//     } catch (error) {
//         console.error(error);
//     }
// }

// await seedAdmin()





// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// /* eslint-disable @typescript-eslint/no-unused-vars */

// import { prisma } from "../lib/prisma";
// import { UserRole } from "../middlewares/auth";

// async function seedAdmin() {
//   try {
//     const adminData = {
//       name: "admin",
//       email: "admin45@gmail.com",
//       role: UserRole.ADMIN,
//       password: "pk2026",
//       emailVerified : true
//     };
//     // check admin is exists or not in db
//     const existingUser = await prisma.user.findUnique({
//       where: {
//         email: adminData.email,
//       },
//     });

//     if (existingUser) {
//       throw new Error("User already exist!");
//     }
//     const signUpAdmin = await fetch(
//       "http://localhost:5000/api/auth/sign-up/email",
//       {
//         method: "POST",
//         headers: {
//           "content-type": "application/json",
//         },
//         body: JSON.stringify(adminData),
//       },
//     );
//     console.log(signUpAdmin)

//   } catch (error) {
//     console.error(error);
//   }
// }

// await seedAdmin()

// import { randomUUID } from "crypto";
// import { prisma } from "../lib/prisma";
// import { UserRole } from "../middlewares/auth";

// async function seedAdmin() {
//   const email = "pkadmin50@gmail.com";

//   const existingUser = await prisma.user.findUnique({
//     where: { email },
//   });
//   if (existingUser) {
//     console.log("Admin already exists");
//     return;
//   }



//   await prisma.user.create({
//     data: {
//       id: randomUUID(),
//       name: "admin",
//       email,
//       password : "pk2026",
//       role: UserRole.ADMIN,
//       emailVerified: true,
//     },
//   });
//   console.log("admin created successfully");
// }

// seedAdmin()
//   .then(() => process.exit(0))
//   .catch(console.error);
