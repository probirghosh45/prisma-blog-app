import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { PostController } from "./post.controller";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.User, UserRole.Admin),
  PostController.createPost,
);
router.get(
  "/",
  auth(UserRole.User, UserRole.Admin),
  PostController.getAllPosts,
);

export const postRouter = router;
