import { Comment } from "./types";
import "./comment.scss";

interface Props {
  comment: Comment;
};

const CommentCard: React.FC<Props> = ({ comment }) => {
  return (
    <div className="comment">
      <p>
        {comment.name.toUpperCase()} por {comment.email}
      </p>
      <span>
        {comment.body}
      </span>
    </div>
  )
}

export default CommentCard;