import { useAppSelector } from "../"; 
import * as CommentStore from "../slice/comment.slice";

const useCommentStore = () => {
  const comments = useAppSelector(CommentStore.select.comments);
  const allComments = useAppSelector(CommentStore.select.allComments);

  return { comments, allComments };
};

export default useCommentStore;
