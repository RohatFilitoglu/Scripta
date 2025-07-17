import { createServer, Model } from "miragejs";
import postsData from "../data/posts.json";
import usersData from "../data/users.json";
import commentsData from "../data/comments.json";

export function makeServer() {
  return createServer({
    models: {
      post: Model,
      user: Model,
      comment: Model,
      todo: Model,
    },

    seeds(server) {
      usersData.forEach((user) =>
        server.create("user", { ...user, id: String(user.id) })
      );

      postsData.forEach((post) =>
        server.create("post", {
          ...post,
          id: String(post.id),
          userId: String(post.userId),
        })
      );

      commentsData.forEach((comment) =>
        server.create("comment", {
          ...comment,
          id: String(comment.id),
          postId: String(comment.postId),
          userId: String(comment.userId),
        })
      );
    },

    routes() {
      this.namespace = "api";

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.get("/users", (schema: any) => {
        return schema.users.all();
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.get("/posts", (schema: any) => {
        return schema.posts.all();
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.get("/posts/:id", (schema: any, request) => {
        return schema.posts.find(request.params.id);
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.get("/comments", (schema: any) => {
        return schema.comments.all();
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.get("/posts/:id/comments", (schema: any, request) => {
        return schema.comments.where({ postId: request.params.id });
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.post("/posts", (schema: any, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.posts.create(attrs);
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.delete("/posts/:id", (schema: any, request) => {
        return schema.posts.find(request.params.id)?.destroy();
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.get("/users/:id/todos", (schema: any, request) => {
        return schema.todos.where({ userId: request.params.id });
      });
    },
  });
}

export default makeServer;
