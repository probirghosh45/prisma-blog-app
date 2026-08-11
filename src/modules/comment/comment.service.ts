import { prisma } from "../../lib/prisma";

const createComment = async (payload:{
  content: string;
  authorId: string;
  postId: string;
}) => {
  // console.log("createComment called");
await prisma.post.findUniqueOrThrow({
    where: { id: payload.postId },
  });

  return await prisma.comments.create({
    data : payload
  })

}

export const commentService= {
  createComment,
};