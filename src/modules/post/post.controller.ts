/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response } from "express";
import paginationSortingHelper from "../../helpers/paginationSortingHelper";
import { postService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  //   console.log(req.body);
  try {
    const result = await postService.createPost(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      error: "Post creation failed",
      details: error,
    });
  }
};

const getAllPost = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const searchString = typeof search === "string" ? search : undefined;
    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured === "true"
        ? true
        : req.query.isFeatured === "false"
          ? false
          : undefined
      : undefined;

    const status = req.query.status;

    // const page = Number(req.query.page ?? 1);
    // const limit = Number(req.query.limit ?? 10);
    // const skip = (page - 1) * limit;

    // const sortBy = req.query.sortBy as string | undefined
    // const sortOrder = req.query.sortOrder as string | undefined

    const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper(
      req.query,
    );
    // console.log({options})

    // console.log({ isFeatured });
    const result = await postService.getAllPost({
      search: searchString,
      tags,
      isFeatured,
      status,
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: "Post not found",
      details: error,
    });
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    console.log(postId)
    if (!postId) {
      throw new Error("Post Id is required!");
    }
    const result = await postService.getPostById(postId);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Post creation failed",
      details: e,
    });
  }
};

export const PostController = {
  createPost,
  getAllPost,
  getPostById
};
