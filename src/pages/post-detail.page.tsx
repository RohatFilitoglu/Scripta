import { useParams } from "react-router-dom";

const PostDetailPage = () => {
  const param = useParams();
  const id = param.id;
  const title = param.title;
  
  return (
    <div>
      <h1>{title}</h1>
      <p>{id}</p>
    </div>
  );
};

export default PostDetailPage;
