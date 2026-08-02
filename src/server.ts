<<<<<<< HEAD
<<<<<<< HEAD
import app from "./app";
import { prisma } from "./lib/prisma";

const PORT = process.env.PORT || 5000;

async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to Database");
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  } catch (error) {
    console.log("An Error occurred", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

void main();
=======
import { prisma } from "../lib/prisma";
=======
>>>>>>> part-2_Authentication-Authorization
import { app } from "./app";
import { prisma } from "./lib/prisma";

const PORT = process.env.PORT || 5000;

async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to Database Successfully");
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
  } catch (error) {
    console.error("An error occurred while running the main function:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

<<<<<<< HEAD
main()
>>>>>>> master
=======
main();
>>>>>>> part-2_Authentication-Authorization
