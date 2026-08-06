import { Post } from "../../../generated/prisma/client";
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
}: {
  search?: string;
  tags?: string[];
  isFeatured?: boolean;
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

  if(isFeatured !== undefined) {
    andConditions.push({
      isFeatured,
    });
  }
 

  const result = await prisma.post.findMany({
    where: {
      AND: andConditions,
    },
  });
  return result;
};

export const PostService = {
  createPost,
  getAllPosts,
};
