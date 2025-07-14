export type newPostPayload = {
    author: string;
    title: string;
    userId: string;
    excerpt: string;
    date: string;
    likes?: number;
    image: string;
    category: string
};

export type getAllPostsResponse = {
    id: string;
    title: string;
    author: string;
    excerpt: string;
    image: string;
    category: string;
    date: string;
    userId: string;
    likes?: number;
    created_at: string;
}[];

export type getPostResponse = {
    id: string;
    title: string;
    author: string;
    excerpt: string;
    image: string;
    category: string;
    date: string;
    userId: string;
    likes?: number;
    created_at: string;
};

export type PostType = {
  id: string;
  title: string;
  author: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  userId: string;
  likes?: number;
};
