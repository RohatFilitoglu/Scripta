import http from "../http";
import type {
  getAllCommentsResponse,
  getCommentResponse,
  newCommentPayload,
} from "../models/comments.type";

const CommentService = {
  getAllComments: () =>
    http.get<getAllCommentsResponse[]>("/comments"),

  getComment: (postId: string) =>
    http.get<getCommentResponse>(`/comments/${postId}`),

  newComment: (payload: newCommentPayload) =>
    http.post<getCommentResponse>("/comments", payload),

  updateComment: (id: string, payload: newCommentPayload) =>
    http.put<getCommentResponse>(`/comments/${id}`, payload),

  deleteComment: (id: string) =>
    http.delete<{ message: string }>(`/comments/${id}`),
};

export default CommentService;
