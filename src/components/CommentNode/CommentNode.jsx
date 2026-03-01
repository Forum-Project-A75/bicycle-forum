import CommentsCreator from '../CommentsCreator/CommentsCreator';
import { useState } from 'react';
import { useAuth } from '../../hoc/auth-context';
import VotePanel from '../VotePanel/VotePanel';
import './CommentNode.css';
import { formatDateTime } from '../../Services/DateTimeFormat/DateTimeFormat';
import { post_statuses } from '../../constants';
//import { createLogger, LOG_MODULES } from '../../debug/debug';

//const log = createLogger(LOG_MODULES.COMMENT_NODE);

export default function CommentNode({
  comment,
  tree,
  setTree,
  isAdmin = false,
}) {
  const [replying, setReplying] = useState(false);
  const { user, userData } = useAuth();

  //log.log("comment: ", comment);

  return (
    <div className={`comment ${post_statuses[comment.fk_post_status_id]}`}>
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
        <div className="comment-main">
          <div className="comment-top">
            <span className="author">{comment.username}</span>
            {isAdmin && (
              <div className="comment-status">
                {post_statuses[comment.fk_post_status_id]}
              </div>
            )}
          </div>
          <div className="comment-content">{comment.content}</div>
          <div className="comment-bottom">
            <div className="reply-container">
              <button
                className="reply-button"
                onClick={() => setReplying(true)}
              >
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
            <span className="date">{formatDateTime(comment.created_on)}</span>
          </div>
        </div>
      </div>
      {/* ДЕЦАТА */}
      {comment.children.map((child) => (
        <CommentNode
          key={child.id}
          comment={child}
          tree={tree}
          setTree={setTree}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
}
