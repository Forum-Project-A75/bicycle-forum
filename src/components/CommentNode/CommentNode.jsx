import CommentsCreator from '../CommentsCreator/CommentsCreator';
import { useState } from 'react';
import { useAuth } from '../../hoc/auth-context';
import VotePanel from '../VotePanel/VotePanel';
import './CommentNode.css';

export default function CommentNode({ comment }) {
  const [replying, setReplying] = useState(false);
  const { user } = useAuth();

  return (
    <div className="comment">
      <div>{comment.handle}</div>
      {
        <VotePanel
          postId={comment.id}
          score={comment.score}
          upvotes={comment.upvotes}
          downvotes={comment.downvotes}
          userVote={comment.my_vote}
        />
      }
      <div>
        <div className="comment-content">{comment.content}</div>
        <button className="reply-button" onClick={() => setReplying(true)}>
          Reply
        </button>

        {replying && (
          <CommentsCreator
            userId={user.id}
            parentId={comment.id}
            setReplying={setReplying}
          />
        )}
      </div>

      {/* ДЕЦАТА */}
      {comment.children.map((child) => (
        <CommentNode key={child.id} comment={child} />
      ))}
    </div>
  );
}
