import { prisma } from "../lib/prisma";
import { app } from "./app";

const PORT = process.env.PORT || 5000;

async function main(){
    try{
        await prisma.$connect();
        console.log("Connected to Database Successfully")
        app.listen(PORT, () => {
            console.log("Server is running on http://localhost:" + PORT);
        });
    } catch (error) {
        console.error("An error occurred while running the main function:", error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

main()