import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { PostController } from "./post.controller";

const router = express.Router();

// const auth = (...roles: any) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     const session = await betterAuth.api.getSession({
//       headers: req.headers as any,
//     });
//     // console.log(session);
//     if (!session) {
//       return res.status(401).json({
//         success: false,
//         message: "you are not authorized",
//       });
//     }

//     if (!session.user.emailVerified) {
//       return res.status(403).json({
//         success: false,
//         message: "Email verification required,please verify your email",
//       });
//     }
//   };
// };

router.post("/", auth(UserRole.USER), PostController.createPost);

router.get("/", PostController.getAllPost);
router.get("/:postId", PostController.getPostById);

export const postRouter = router;
