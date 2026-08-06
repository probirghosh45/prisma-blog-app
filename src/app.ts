import express from "express";
import { postRouter } from "./modules/post/post.router";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

const app = express();
app.use(express.json());
app.use("/api/auth", toNodeHandler(auth));



app.get("/", (req, res) => {
    res.send("Welcome to the prisma blog app");
});

app.use("/posts", postRouter);


export { app };
