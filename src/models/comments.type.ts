export type newCommentPayload = {
  content: string;
  postId: string;
  author: string;
  userId: string;
  date: string;
};

export type getAllCommentsResponse = {
  id: string;
  postId: string;
  content: string;
  author: string;
  date: string;
  userId: string;
};

export type getCommentResponse = {
  id: string;
  postId: string;
  content: string;
  author: string;
  date: string;
  userId: string;
};
export type CommentType = {
  id: string;
  postId: string;
  content: string;
  author: string;
  date: string;
  userId: string;
};
