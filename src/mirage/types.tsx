
import { Model } from "miragejs";
import type { Registry } from "miragejs";

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
};

export type Comment = {
  id: string;
  postId: string;
  userId: string;
  author: string;
  content: string;
  date: string;
};

export type Todo = {
  id: string;
  userId: string;
  title: string;
  completed: boolean;
};

export type AppModels = {
  post: typeof Model;
  user: typeof Model;
  comment: typeof Model;
  todo: typeof Model;
};

export type AppRegistry = Registry<AppModels, Record<string, never>>;
