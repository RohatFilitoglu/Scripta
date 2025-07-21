export type newCommentPayload = {
  content: string;
  postid: string;
  author: string;
  userid: string;
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
  postid: string;
  content: string;
  author: string;
  date: string;
  userid: string;
}[];
export type CommentType = {
  id: string;
  postId: string;
  content: string;
  author: string;
  date: string;
  userId: string;
};
