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

  newPost: (payload: FormData) =>
    http.post("/posts", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  getPost: (id: string) => http.get<getPostResponse>(`/posts/${id}`),

  updatePost: (id: number, post: newPostPayload) =>
    http.put(`/posts/${id}`, post),

  deletePost: (id: string) => http.delete<{ message: string }>(`/posts/${id}`),

  getSearchPost: (search: string) =>
    http.get<getAllPostsResponse>(`/posts/search?query=${search}`),
};

export default PostService;
