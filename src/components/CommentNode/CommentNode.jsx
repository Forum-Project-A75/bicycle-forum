import CommentsCreator from '../CommentsCreator/CommentsCreator';
import { useState } from 'react';
import { useAuth } from '../../hoc/auth-context';
import VotePanel from '../VotePanel/VotePanel';
import './CommentNode.css';

export default function CommentNode({ comment, tree, setTree }) {
  const [replying, setReplying] = useState(false);
  const { user, userData } = useAuth();

  return (
    <div className="comment">
      <div className="comment-details">
        <div>{comment.handle}</div>
        {
          <VotePanel
            postId={comment.id}
            score={comment.score}
            upvotes={comment.upvotes}
            downvotes={comment.downvotes}
            userVote={comment.my_vote}
            tree={tree}
            setTree={setTree}
          />
        }
        <div>
          <div className="comment-content">{comment.content}</div>
          <div className="reply-container">
            <button className="reply-button" onClick={() => setReplying(true)}>
              Reply
            </button>

            {replying && (
              <CommentsCreator
                userId={user.id}
                parentId={comment.id}
                setReplying={setReplying}
                setTree={setTree}
                username={userData.handle}
              />
            )}
          </div>
        </div>
      </div>
      {/* ДЕЦАТА */}
      {comment.children.map((child) => (
        <CommentNode key={child.id} comment={child} tree={tree} setTree={setTree} />
      ))}
    </div>
  );
}
