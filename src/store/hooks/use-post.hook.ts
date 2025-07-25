import { useAppSelector } from "../";
import * as PostStore from "../slice/post.slice";

const usePostStore = () => {
  const allPosts = useAppSelector(PostStore.select.getAllPosts);
  const selectedPost = useAppSelector(PostStore.select.getSelectedPost);
  const userPosts = useAppSelector(PostStore.select.getUserPosts);

  return { allPosts, selectedPost,userPosts };
};

export default usePostStore;
