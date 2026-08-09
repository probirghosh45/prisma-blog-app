import { Request, Response } from "express";
import { PostStatus } from "../../../generated/prisma/enums";
import { PostService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    // console.log("check",req.user)

    const result = await PostService.createPost(
      req.body,
      req.user?.id as string,
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
};

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    // console.log("search value", search);
    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];
    // console.log({tags})
    // const isFeatured =
    //   req.query.isFeatured === "true"
    //     ? true
    //     : req.query.isFeatured === "false"
    //       ? false
    //       : undefined;

    // const isFeatured = req.query.isFeatured
    //   ? req.query.isFeatured === "true"
    //     ? true
    //     : req.query.isFeatured === "false"
    //       ? false
    //       : undefined
    //   : undefined;

    const rawIsFeatured = req.query.isFeatured;
    if (
      rawIsFeatured !== undefined &&
      rawIsFeatured !== "true" &&
      rawIsFeatured !== "false"
    ) {
      return res.status(400).json({
        error: "Invalid value for isFeatured. Must be 'true' or 'false'.",
      });
    }

    const isFeatured =
      rawIsFeatured === "true"
        ? true
        : rawIsFeatured === "false"
          ? false
          : undefined;

    const page = Number(req.query.page) || 1;
    console.log("page value", page);
    // ||  → falsy হলে fallback
    // ??  → Only null/undefined হলে fallback
    const limit = Number(req.query.limit) || 10;
    console.log("limit value", limit);

    const query: {
      search?: string;
      tags?: string[];
      isFeatured?: boolean;
      status?: PostStatus;
      authorId?: string;
      page: number;
      limit: number;
    } = {
      search: search as string,
      tags,
      page,
      limit,
    };

    if (isFeatured !== undefined) {
      query.isFeatured = isFeatured;
    }

    if (req.query.status !== undefined) {
      query.status = req.query.status as PostStatus;
    }

    if (req.query.authorId !== undefined) {
      query.authorId = req.query.authorId as string;
    }

    const result = await PostService.getAllPosts(query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

export const PostController = {
  createPost,
  getAllPosts,
};
