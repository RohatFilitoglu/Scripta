import http from "../http";
import type {
  getAllPostsResponse,
  getPostResponse,
  newPostPayload,
} from "../models/posts.type";

const PostService = {
  getAllPosts: () => http.get<getAllPostsResponse>("/posts"),

  getPostsByUser: (userId: string) =>
  http.get<getAllPostsResponse>(`/posts/user/${userId}`),

  newPost: (payload: newPostPayload) => http.post("/posts", payload),

  getPost: (id: string) => http.get<getPostResponse>(`/posts/${id}`),

  updatePost: (id: number, post: newPostPayload) =>
    http.put(`/posts/${id}`, post),

  deletePost: (id: string) =>
    http.delete<{ message: string }>(`/posts/${id}`),
};

export default PostService;
