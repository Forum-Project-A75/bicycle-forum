import CommentsCreator from '../CommentsCreator/CommentsCreator';
import { useState } from 'react';
import { useAuth } from '../../hoc/auth-context';
import VotePanel from '../VotePanel/VotePanel';
import './CommentNode.css';
//import { createLogger, LOG_MODULES } from '../../debug/debug';

//const log = createLogger(LOG_MODULES.COMMENT_NODE);


export default function CommentNode({ comment, tree, setTree }) {
  const [replying, setReplying] = useState(false);
  const { user, userData } = useAuth();

  //log.log("comment: ", comment);

  return (
    <div className="comment">
      <div className="comment-details">
        {
          <VotePanel
            postId={comment.id}
            score={comment.score}
            upvotes={comment.upvotes}
            downvotes={comment.downvotes}
            userVote={comment.my_vote}
            setTree={setTree}
          />
        }
        <div>
          <span className="author">{comment.username}</span>
          <span className="date">
              {new Date(comment.created_on).toLocaleDateString()}
          </span>
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
