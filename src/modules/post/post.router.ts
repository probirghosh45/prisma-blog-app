import express from "express";
import { postController } from "./post.controller";

const router = express.Router();

router.get("/posts", (req, res) => {
  res.send("List of posts");
});

router.post("/",postController.createPost);

export const postRouter = router;
