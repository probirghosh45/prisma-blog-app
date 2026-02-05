/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// import { prisma } from "../../lib/prisma";

import { CommentStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

type CreateCommentPayload = {
  content: string;
  postId: string;
  authorId: string;
  parentId?: string;
  status?: CommentStatus;
};

const createComment = async (payload: CreateCommentPayload) => {
  console.log("prisma", payload);

  await prisma.post.findFirstOrThrow({
    where: {
      id: payload.postId,
    },
  });

  if (payload.parentId) {
    await prisma.comment.findFirstOrThrow({
      where: {
        id: payload.parentId,
      },
    });
  }

  return await prisma.comment.create({
    data: {
      content: payload.content,
      postId: payload.postId,
      authorId: payload.authorId,
      parentId: payload.parentId ?? null,
      status: payload.status ?? CommentStatus.APPROVED,
    },
  });
};

export const CommentService = {
  createComment,
};
