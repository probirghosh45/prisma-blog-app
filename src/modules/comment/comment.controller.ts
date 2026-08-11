import { Request, Response } from "express";
import { commentService } from "./comment.service";

const createComment = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.body.authorId = user.id;
    const result = await commentService.createComment(req.body);
    console.log({ userId: user.id, authorId: req.body.authorId, result });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create comment" });
  }
};

export const commentController = {
  createComment,
};
