import { useEffect, useState } from "react";
import { Comment, CommentResponse, Post } from "./types";
import CommentCard from './comment';
import "./post.scss";
import api from "../../config/api";
import { BEARER } from "../../constants/authorization";

interface Props {
  post: Post;
};

const PostCard: React.FC<Props> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    api.get<CommentResponse>("/posts/comments", { params: { postId: post.id }, ...BEARER() })
      .then(({ data }) => setComments(data.data))
      .catch(err => console.log(err))
  }, []);

  return (
    <tr key={post.id} className="post-card">
      <td>
        <h4>{post.title.toUpperCase()}</h4>
        <p>{post.body}</p>
        <button
          type="button"
          className="btn btn-info"
          onClick={() => setShowComments(prev => !prev)}
        >
          {showComments ? "Dejar de ver" : "Ver comentarios"}
        </button>
        {showComments && (
          comments.map(comment => (
            <CommentCard key={comment.id} comment={comment} />
          ))
        )}
      </td>
    </tr>
  )
}

export default PostCard;