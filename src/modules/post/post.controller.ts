import { Request, Response } from "express";
import { PostService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await PostService.createPost(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
};

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const result = await PostService.getAllPosts();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

export const PostController = {
  createPost,
  getAllPosts,
};
