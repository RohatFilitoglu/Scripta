import { useAppSelector } from "../";
import * as PostStore from "../slice/post.slice";

const usePostStore = () => {
  const allPosts = useAppSelector(PostStore.select.getAllPosts);
  const selectedPost = useAppSelector(PostStore.select.getSelectedPost);

  return { allPosts, selectedPost };
};

export default usePostStore;
