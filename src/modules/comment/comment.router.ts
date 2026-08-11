import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { commentController } from "./comment.controller";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.User, UserRole.Admin),
  commentController.createComment
);

export const commentRouter = router;