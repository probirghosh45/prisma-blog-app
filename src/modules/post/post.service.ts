import { Post, PostStatus } from "../../../generated/prisma/client";
import { PostWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

const createPost = async (
  data: Omit<Post, "id" | "createdAt" | "updatedAt" | "authorId">,
  userId: string,
) => {
  const result = await prisma.post.create({
    data: {
      ...data,
      authorId: userId,
    },
  });
  // console.log("Post created:", result);
  return result;
};

const getAllPosts = async ({
  search,
  tags,
  isFeatured,
  status,
  authorId,
  page,
  limit,
  sortBy,
  sortOrder,
}: {
  search?: string;
  tags?: string[];
  isFeatured?: boolean;
  status?: PostStatus;
  authorId?: string;
  page?: number;
  limit?: number;
  skip?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) => {
  const andConditions: PostWhereInput[] = [];
  if (search) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          tags: {
            has: search,
          },
        },
      ],
    });
  }
  if (tags && tags.length > 0) {
    {
      andConditions.push({
        tags: {
          hasSome: tags,
        },
      });
    }
  }

  if (isFeatured !== undefined) {
    andConditions.push({
      isFeatured: isFeatured,
    });
  }

  if (status !== undefined) {
    andConditions.push({
      status,
    });
  }

  if (authorId !== undefined) {
    andConditions.push({
      authorId,
    });
  }

  const currentPage = page ?? 1;
  const currentLimit = limit ?? 10;
  const pagination =
    page !== undefined && limit !== undefined
      ? {
          take: currentLimit,
          skip: (currentPage - 1) * currentLimit,
        }
      : undefined;

  const result = await prisma.post.findMany({
    // filtering
    where: {
      AND: andConditions,
    },
    // sorting
    ...(pagination ?? {}),
    orderBy:
      sortBy && sortOrder
        ? ({ [sortBy]: sortOrder } as const)
        : ({ createdAt: "desc" } as const),
  });
  return result;
};

export const PostService = {
  createPost,
  getAllPosts,
};
