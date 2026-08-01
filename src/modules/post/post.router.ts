import { fromNodeHeaders } from "better-auth/node";
import express, { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from "../../lib/auth";
import { PostController } from "./post.controller";

const router = express.Router();

export enum UserRole {
  Admin = "ADMIN",
  User = "USER",
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
        role: string;
        emailVerified: boolean;
      };
    }
  }
}

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // console.log("Authenticating user...");
    // console.log(roles)
    const session = await betterAuth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    // console.log("Session:", session);
    // return res.json(session);

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!session.user.emailVerified) {
      return res.status(403).json({
        success: false,
        message: "Email not verified,Please verify your email",
      });
    }

    req.user = {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      role: session.user.role as string,
      emailVerified: session.user.emailVerified,
    };

    if (roles.length && !roles.includes(req.user.role as UserRole)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden, You don't have permission to access this resource",
      });
    }
    // console.log(session);

    next();
  };
};

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
