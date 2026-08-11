import { toNodeHandler } from "better-auth/node";
import express from "express";
import { auth } from "./lib/auth";
import { commentRouter } from "./modules/comment/comment.router";
import { postRouter } from "./modules/post/post.router";

const app = express();
app.use(express.json());
app.use("/api/auth", toNodeHandler(auth));

app.get("/", (req, res) => {
  res.send("Welcome to the prisma blog app");
});

app.use("/posts", postRouter);
app.use("/comments", commentRouter);

export { app };
