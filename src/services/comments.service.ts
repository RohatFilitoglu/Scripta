import http from "../http";

type Comment = {
  id: string;
  postId: string;
  userId: string;
  content: string;
  author: string;
  date?: string;
};

type NewCommentPayload = {
  postId: string;
  userId: string;
  content: string;
  author: string;
};

type UpdateCommentPayload = {
  content: string;
  author: string;
};

const CommentService = {
  getCommentsByPostId: (postId: string) =>
    http.get<Comment[]>(`/comments/${postId}`),

  addComment: (payload: NewCommentPayload) =>
    http.post<Comment>("/comments", payload),

  deleteComment: (id: string) => http.delete<void>(`/comments/${id}`),

  updateComment: (id: string, payload: UpdateCommentPayload) =>
    http.put<Comment>(`/comments/${id}`, payload),
};

export default CommentService;
